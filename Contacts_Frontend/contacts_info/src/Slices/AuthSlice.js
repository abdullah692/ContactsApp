import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import auth from '../services/authService'

const initialState = {
  isLoggedIn:false,
  // accessToken: "",
  user: localStorage.getItem("user") || null,
};

export const postRegisterUser = createAsyncThunk(
  "auth/postRegisterUser",
  async ({ registerData }, { rejectWithValue }) => {
    console.log(registerData, "apidata");
    debugger;
    try {
      const apiRes = await auth.register(registerData)
      console.log(apiRes.data);
      return apiRes.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const postLoginUser = createAsyncThunk(
    "auth/postLoginUser",
    async ({ loginData }, { rejectWithValue }) => {
      console.log(loginData, "apidata");
      debugger;
      try {
        const apiRes = await auth.login(loginData)
        console.log(apiRes?.data);
        return apiRes?.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // storeAccessToken: (state,action) => {
    //     console.log(action.payload);
    //   state.accessToken = action.payload;
    // },
    logout: (state) => {
        state.user = null;
        state.isLoggedIn = false;
      },
  },
  extraReducers:(builder)=> {
    builder.addCase(postLoginUser.fulfilled, (state, { payload }) => {
        console.log(payload, "pauload of loggedIn user");
        state.isLoggedIn = true;
        localStorage.setItem("accessToken", payload.accessToken)
        state.user = payload;
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
