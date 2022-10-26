import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  loading: false,
  error: null,
  users: []
};

export const suggestionSlice = createSlice({
  name: 'suggestions',
  initialState: INITIAL_STATE,
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
    },
    removeUserSuggesstion: (state, action) => {
      state.users = state.users.filter((item) => item._id !== action.payload);
    }
  }
});

export const {
  getSuggestionRequested,
  getSuggestionSuccess,
  getSuggestionFailure,
  removeUserSuggesstion
} = suggestionSlice.actions;

export default suggestionSlice.reducer;
