import { configureStore } from '@reduxjs/toolkit'

import { combineReducers } from 'redux'
import  sideBarControler  from './constants'



const rootReducer = combineReducers({
    sideBarControler: sideBarControler,

})


export const store = configureStore({
    reducer: rootReducer,
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
