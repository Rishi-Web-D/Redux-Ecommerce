import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  isLoading: true,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoriesSuccess: (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    },
    fetchCategoriesFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { fetchCategoriesSuccess, fetchCategoriesFailure } = categoriesSlice.actions;
export default categoriesSlice.reducer;
