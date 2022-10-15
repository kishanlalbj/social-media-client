import { createSlice } from '@reduxjs/toolkit';

export const suggestionSlice = createSlice({
  name: 'suggestions',
  initialState: {
    loading: false,
    error: null,
    users: []
  },
  reducers: {
    getSuggestionRequested: (state) => {
      state.loading = true;
    },
    getSuggestionSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.users = action.payload;
    },
    getSuggestionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { getSuggestionRequested, getSuggestionSuccess, getSuggestionFailure } =
  suggestionSlice.actions;

export default suggestionSlice.reducer;
