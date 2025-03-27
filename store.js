import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'slices/authSlice'
import themeReducer from 'slices/themeSlice'
import userDetailsReducer  from 'slices/userDetailsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    userDeets: userDetailsReducer 
  },
})