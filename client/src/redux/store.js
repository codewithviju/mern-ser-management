import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./reducers/userReducer";
const store = configureStore({
  reducer: {
    users: userReducers,
  },
});

export default store;
