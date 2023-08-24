import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    amount: 0,
}

export const getuserData = createAsyncThunk(
    "account/getData",
    async (userId, thunkAPI) => {
        const { data } = await axios.get(`http://localhost:8080/account/${userId}`);
        return data.amount
    }
)

export const amountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        increment: (state) => {
            state.amount++
        },
        decrement: (state) => {
            if (state.amount <= 0) state.amount = 0
            else state.amount++
        },
        incrementByValue: (state, action) => {
            if (action.payload) state.amount += Number(action.payload)
            else alert("Please first enter value in the input box")
        },
        decrementByValue: (state, action) => {
            if (state.amount <= 0) { state.amount = 0; { action.payload ? alert("Please add the amount First ") : alert("Please first enter value in the input box") } }
            else { state.amount < action.payload ? alert("Blance Low") : state.amount -= Number(action.payload) }
        }
    },
    extraReducers: (bulider) => {
        bulider.addCase(getuserData.fulfilled, (state, action) => {
            state.amount = action.payload;
            state.pending = false;
        })

        bulider.addCase(getuserData.pending, (state) => {
            state.pending = true;
        })

        bulider.addCase(getuserData.rejected, (state, action) => {
            state.error = action.error;
            if (action.error) alert(action.error.message)
            state.pending = false;
        })

    }
})


export const { increment, decrement, incrementByValue, decrementByValue } = amountSlice.actions;

export default amountSlice.reducer