import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  users: null,
  isloading: true,
  error: "",
};

export const fetchAllUsers = createAsyncThunk(
  "users/fetchByIdStatus",
  async () => {
    const response = await axios.get(
      "http://localhost:9000/api/users/getusers"
    );
    return response.data;
  }
);

export const createNewUser = createAsyncThunk(
  "users/createnewuser",
  async (users) => {
    const response = await axios.post(
      "http://localhost:9000/api/users/createuser",
      users
    );
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  "users/createnewuser",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:9000/api/users/deleteuser/${id}`
    );
    return response.data;
  }
);

const userSlice = createSlice({
  name: "reducers/user",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchAllUsers.pending]: (state, action) => {
      state.isloading = true;
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.isloading = false;
    },
  },
});

export default userSlice.reducer;
