import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    loading: false,
    error: null,
    id: null,
    firstName: '',
    lastName: '',
    followers: [],
    following: []
  },
  reducers: {
    getProfileRequested: (state) => {
      state.loading = true;
    },
    getProfileSuccess: (state, action) => {
      const { _id, firstName, lastName, followers, following } = action.payload;
      state.loading = false;
      state.id = _id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.followers = followers;
      state.following = following;
      state.error = null;
    },
    getProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { getProfileRequested, getProfileSuccess, getProfileFailure } = profileSlice.actions;

export default profileSlice.reducer;
