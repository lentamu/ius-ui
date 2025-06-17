import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchApi } from '../../lib/api'
import { RootState } from '../reducer'

export type About = {
  id: string
  description: string
  updatedAt: string
}

interface AboutState {
  about: About | null
  loading: boolean
  saving: boolean
  error: string | null
}

const initialState: AboutState = {
  about: null,
  loading: false,
  saving: false,
  error: null
}

export const fetchAbout = createAsyncThunk<About, void, { rejectValue: string }>(
  'about/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await fetchApi('/about')
      const body = await response.json()
      if (!response.ok) {
        return thunkAPI.rejectWithValue(body.message || 'Failed to fetch about info')
      }
      return body as About
    } catch (err) {
      return thunkAPI.rejectWithValue('Network error while fetching about info')
    }
  }
)

export const updateAbout = createAsyncThunk<
  About,
  { id: string, description: string },
  { state: RootState, rejectValue: string }
>(
  'about/update',
  async ({ id, description }, thunkAPI) => {
    const role = thunkAPI.getState().auth.user?.role
    if (role?.toLowerCase() !== 'admin') {
      return thunkAPI.rejectWithValue('Only admin can edit this content')
    }

    try {
      const response = await fetchApi('/about', {
        method: 'PATCH',
        body: {
          id,
          description
        }
      })

      const body = await response.json()
      if (!response.ok) {
        return thunkAPI.rejectWithValue(body.message || 'Failed to save')
      }

      return body as About
    } catch (err) {
      return thunkAPI.rejectWithValue('Network error while saving')
    }
  }
)

const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbout.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAbout.fulfilled, (state, action: PayloadAction<About>) => {
        state.about = action.payload
        state.loading = false
      })
      .addCase(fetchAbout.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Unable to load about info'
      })
      .addCase(updateAbout.pending, (state) => {
        state.saving = true
        state.error = null
      })
      .addCase(updateAbout.fulfilled, (state, action: PayloadAction<About>) => {
        state.about = action.payload
        state.saving = false
      })
      .addCase(updateAbout.rejected, (state, action) => {
        state.saving = false
        state.error = action.payload || 'Unable to save about info'
      })
  }
})

export default aboutSlice.reducer