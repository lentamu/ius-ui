import { combineReducers } from '@reduxjs/toolkit'
import aboutSlice from '../slice/aboutSlice'
import authSlice from '../slice/authSlice'
import shortUrlsSlice from '../slice/shortUrlsSlice'

export const rootReducer = combineReducers({
  about: aboutSlice,
  auth: authSlice,
  shortUrls: shortUrlsSlice
})

export type RootState = ReturnType<typeof rootReducer>