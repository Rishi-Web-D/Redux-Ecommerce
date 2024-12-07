import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    setUserFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setUserStart, setUserSuccess, setUserFailure, logoutUser } = userSlice.actions;
export default userSlice.reducer;
