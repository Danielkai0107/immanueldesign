import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slice/productSlice'

export default configureStore({
  reducer: {
    products: productsReducer,
  },
})
