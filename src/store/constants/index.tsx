import { createSlice } from '@reduxjs/toolkit'

export interface ISideBar {
    mlsNumber : string
}
const initialState: ISideBar = {
   mlsNumber : ''
}
export const sideBarControler = createSlice({
    name: 'sideBarControler',
    initialState,
    reducers: {
        toggleMlsNumber: (state, action: { payload: { mlsNumber: string } }) => {
            state.mlsNumber = action.payload.mlsNumber
        },
    },
})

export const { toggleMlsNumber } =
    sideBarControler.actions

export default sideBarControler.reducer
