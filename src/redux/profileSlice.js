import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    firstName: '',
    lastName: '',
    email: '',
    followers: [],
    following: [],
    posts: [],
    loading: false,
    error: null
  },
  reducers: {
    getProfileRequested: (state) => {
      state.loading = true;
    },
    getProfileSuccess: (state, action) => {
      const { firstName, lastName, email, followers, following } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.followers = followers;
      state.following = following;
      state.loading = false;
    },
    getProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getPostsByUserRequested: (state) => {
      state.loading = true;
    },
    getPostsByUserSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    getPostsByUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getProfileRequested,
  getProfileSuccess,
  getProfileFailure,
  getPostsByUserRequested,
  getPostsByUserSuccess,
  getPostsByUserFailure
} = profileSlice.actions;

export default profileSlice.reducer;
