import { createAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    points: 0,
}
export const incrementByValue = createAction("account/incrementByValue")


export const bonusSlice = createSlice({
    name: 'bonus',
    initialState,
    reducers: {
        Bonusincrement: (state) => {
            state.points += 1
        },
    },
    extraReducers: (bulider) => {
        bulider.addCase(incrementByValue, (state, action) => {
            if (action.payload >= 100) state.points += 1
        })
    }   
})


export const { Bonusincrement } = bonusSlice.actions;

export default bonusSlice.reducer