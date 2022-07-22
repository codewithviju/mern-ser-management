import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  users: null,
  isloading: true,
  error: "",
  user: {},
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

export const getSingleUser = createAsyncThunk(
  "users/fetchsingleuser",
  async (id) => {
    const response = await axios.get(
      `http://localhost:9000/api/users/singleuser/${id}`
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

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, formData }) => {
    console.log(id, formData);
    const response = await axios.put(
      `http://localhost:9000/api/users/updateuser/${id}`,
      formData
    );
    return response.data;
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  const response = await axios.delete(
    `http://localhost:9000/api/users/deleteuser/${id}`
  );
  return response.data;
});

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
    [getSingleUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isloading = false;
    },
  },
});

export default userSlice.reducer;
