import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { fetchApi } from '../../lib/api'
import { User } from './authSlice'

type ShortUrl = {
  id: string
  originalUrl: string
  slug: string
  user: User | null
  createdAt: string
  updatedAt: string
}

type ShortUrlsState = {
  items: ShortUrl[]
  loading: boolean
  error: string | null
}

const initialState: ShortUrlsState = {
  items: [],
  loading: false,
  error: null
}

export const fetchShortUrls = createAsyncThunk(
  'shortUrls/fetchAll',
  async () => {
    const response = await fetchApi('/short-urls')
    return await response.json()
  }
)

export const createShortUrl = createAsyncThunk<
  ShortUrl,
  { originalUrl: string },
  { rejectValue: string }
>(
  'shortUrls/create',
  async ({ originalUrl }, { rejectWithValue }) => {
    try {
      const response = await fetchApi('/short-urls', {
        method: 'POST',
        body: {
          originalUrl: originalUrl
        }
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to create short URL')
      }

      return await response.json()
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

export const deleteShortUrl = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  'shortUrls/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchApi(`/short-urls/${id}`, { method: 'DELETE' })
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to delete')
      }
      return id
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

const shortUrlsSlice = createSlice({
  name: 'shortUrls',
  initialState,
  reducers: {
    addShortUrl(state, action: PayloadAction<ShortUrl>) {
      state.items.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShortUrls.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchShortUrls.fulfilled, (state, action: PayloadAction<ShortUrl[]>) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchShortUrls.rejected, (state) => {
        state.loading = false
        state.error = 'Failed to fetch'
      })
      .addCase(createShortUrl.fulfilled, (state, action: PayloadAction<ShortUrl>) => {
        state.items.unshift(action.payload)
      })
      .addCase(createShortUrl.rejected, (_, action) => {
        toast.error(action.payload || 'Failed to create short URL')
      })
      .addCase(deleteShortUrl.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(item => item.id !== action.payload)
      })
      .addCase(deleteShortUrl.rejected, (_, action) => {
        toast.error(action.payload || 'Failed to delete URL')
      })
  }
})

export const { addShortUrl } = shortUrlsSlice.actions
export default shortUrlsSlice.reducer