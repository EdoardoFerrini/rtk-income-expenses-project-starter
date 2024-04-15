import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
//initialState
const initialState = {
  loading: false,
  error: null,
  users: [],
  user: {},
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: {},
  },
};

//create Action Creator

export const registerUserAction = createAsyncThunk(
  "user/register",
  async (
    { username, name, password, role },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      //header
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(
        `${baseURL}/auth/register`,
        {
          username,
          name,
          password,
          role,
        },
        config
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = action.payload;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.userAuth.error = action.payload;
    });
  },
});

//generate reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;
