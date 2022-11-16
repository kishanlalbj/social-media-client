import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  profileSearch: {
    loading: false,
    error: null,
    result: []
  },
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
    followUserFailure: (state) => {
      state.loading = false;
    },
    searchProfileRequested: (state) => {
      state.profileSearch.loading = true;
    },
    searchProfileSuccess: (state, action) => {
      state.profileSearch.loading = false;
      state.profileSearch.result = [...action.payload];
      state.profileSearch.error = action.payload;
    },
    searchProfileFailure: (state, action) => {
      state.profileSearch.loading = false;
      state.profileSearch.result = [];
      state.profileSearch.error = action.payload;
    },
    unfollowRequested: (state) => {
      state.loading = true;
    },
    unfollowSuccess: (state, action) => {
      state.loading = false;
      state.following = state.following.filter((item) => item._id !== action.payload);
    },
    unfollowFailure: (state, action) => {
      (state.loading = true), (state.error = action.payload);
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
  searchProfileRequested,
  searchProfileSuccess,
  searchProfileFailure,
  unfollowRequested,
  unfollowSuccess,
  unfollowFailure,
  resetProfile
} = profileSlice.actions;

export default profileSlice.reducer;
