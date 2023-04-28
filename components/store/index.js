import { configureStore } from '@reduxjs/toolkit'
import company from './company'

export default configureStore({
  reducer: {
    company,
  }
})

