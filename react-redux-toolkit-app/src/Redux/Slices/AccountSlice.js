/* eslint-disable no-lone-blocks */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  amount: 0,
  allusers: [],
};

export const getuserData = createAsyncThunk(
  "account/getData",
  async (userId, thunkAPI) => {
    const { data } = await axios.get(`http://localhost:8080/account/${userId}`);
    return data.amount;
  }
);

export const allUserDataGet = createAsyncThunk(
  "account/allUserGet",
  async () => {
    const { data } = await axios.get(`http://localhost:8080/account/`);
    return data;
  }
);

export const setuserData = createAsyncThunk(
  "account/setData",
  async (userData, {dispatch}) => {
    const { name, amount } = userData;
    const { data } = await axios.post(`http://localhost:8080/account/`, {
      name,
      amount: Number(amount),
    });
    await dispatch(allUserDataGet());
    return data;
  }
);

export const userDelete = createAsyncThunk(
  "account/DeleteUser",
  async (UserId, { dispatch }) => {
    const { data } = await axios.delete(
      `http://localhost:8080/account/${UserId}`
    );
    await dispatch(allUserDataGet());
    return data;
  }
);

export const amountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    increment: (state) => {
      state.amount++;
    },
    decrement: (state) => {
      if (state.amount <= 0) state.amount = 0;
      else state.amount++;
    },
    incrementByValue: (state, action) => {
      if (action.payload) state.amount += Number(action.payload);
      else alert("Please first enter value in the input box");
    },
    decrementByValue: (state, action) => {
      if (state.amount <= 0) state.amount = 0;
      if (!action.payload) {
        alert("Please add the amount First");
        state = { ...state };
      }
      if (state.amount < action.payload) alert("Blance Low");
      else state.amount -= Number(action.payload);
      if (state.amount === 0) state = { ...state };
    },
  },
  extraReducers: (bulider) => {
    bulider
      .addCase(getuserData.fulfilled, (state, action) => {
        state.amount = action.payload;
        state.pending = false;
      })
      .addCase(getuserData.pending, (state) => {
        state.pending = true;
      })
      .addCase(getuserData.rejected, (state, action) => {
        state.error = action.error;
        if (action.error) alert(action.error.message);
        state.pending = false;
      })
      .addCase(setuserData.fulfilled, (state) => {
        alert("New User Add");
        state.pending = false;
      })
      .addCase(setuserData.pending, (state) => {
        state.pending = true;
      })
      .addCase(setuserData.rejected, (state, action) => {
        state.error = action.error;
        if (action.error) alert(action.error.message);
        state.pending = false;
      })
      .addCase(allUserDataGet.fulfilled, (state, action) => {
        state.allusers = [action.payload];
        state.pending = false;
      })
      .addCase(allUserDataGet.pending, (state) => {
        state.pending = true;
      })
      .addCase(allUserDataGet.rejected, (state, action) => {
        state.error = action.error;
        if (action.error) alert(action.error.message);
        state.pending = false;
      })
      .addCase(userDelete.fulfilled, (state) => {
        alert("user Account Delete");
        state.pending = false;
      });
  },
});

export const { increment, decrement, incrementByValue, decrementByValue } =
  amountSlice.actions;

export default amountSlice.reducer;
