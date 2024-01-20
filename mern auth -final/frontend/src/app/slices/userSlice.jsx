// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
};

// Create the 'user' slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      // Save user info to localStorage
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    clearCredentials: (state) => {
      state.userInfo = null;
      // Clear user info from localStorage
      localStorage.removeItem("userInfo");
    },
  },
});

// Export the actions
export const { setCredentials, clearCredentials } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
