
import { configureStore } from '@reduxjs/toolkit'
import crudReducer from './reducers/crudSlice'

export default configureStore({
  reducer: {
    crud: crudReducer,
  },
})