import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setToken, getToken, fetchApi } from '../../lib/api'
import { isTokenExpired, parseJwt } from '../../lib/jwt'

export type User = {
  id: string
  username: string
  role: string
}

interface AuthState {
  token: string | null
  user: User | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
}

const storedToken = getToken()
const parsedToken = storedToken ? parseJwt(storedToken) : null

const initialState: AuthState = {
  token: storedToken,
  user: parsedToken
    ? {
      id: parsedToken.sub,
      username: parsedToken.username,
      role: parsedToken.role
    }
    : null,
  loading: false,
  error: null,
  isAuthenticated: !!storedToken && !!parsedToken && !isTokenExpired(storedToken)
}

export const loginUser = createAsyncThunk<
  { token: string; user: User },
  { username: string; password: string },
  { rejectValue: string }
>(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await fetchApi('/login', {
        method: 'POST',
        body: credentials
      })
      const data = await response.json()

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || 'Login failed')
      }

      const parsed = parseJwt(data.token)
      if (!parsed) {
        return thunkAPI.rejectWithValue('Invalid token')
      }

      const user: User = {
        id: parsed.sub,
        username: parsed.username,
        role: parsed.role
      }

      return { token: data.token, user }
    } catch (error) {
      return thunkAPI.rejectWithValue('Unable to connect to server')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null
      state.user = null
      setToken(undefined)
      localStorage.removeItem('token')
    },
    setAuthFromToken(state, action: PayloadAction<string>) {
      const parsed = parseJwt(action.payload)
      if (parsed) {
        state.token = action.payload
        state.user = {
          id: parsed.sub,
          username: parsed.username,
          role: parsed.role
        }
        setToken(action.payload)
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.token
        state.user = action.payload.user
        state.error = null
        state.isAuthenticated = true
        setToken(action.payload.token)
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.user = null
        state.error = action.payload || 'Login failed'
        state.isAuthenticated = false
      })
  }
})

export const { logout, setAuthFromToken } = authSlice.actions
export default authSlice.reducer