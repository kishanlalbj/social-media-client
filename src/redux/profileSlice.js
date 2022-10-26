import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  loading: false,
  error: null,
  id: null,
  firstName: '',
  lastName: '',
  followers: [],
  following: []
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState: INITIAL_STATE,
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
    },
    followUserRequested: (state) => {
      state.loading = true;
    },
    followUserSuccess: (state, action) => {
      state.loading = false;
      state.following = [...state.following, { ...action.payload }];
    },
    followUserFailure: (state, action) => {
      state.loading = false;
    },
    resetProfile: () => INITIAL_STATE
  }
});

export const {
  getProfileRequested,
  getProfileSuccess,
  getProfileFailure,
  followUserRequested,
  followUserSuccess,
  followUserFailure,
  resetProfile
} = profileSlice.actions;

export default profileSlice.reducer;
