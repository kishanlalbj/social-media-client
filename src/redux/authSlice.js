import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    signUpSuccess: false
  },
  reducers: {
    emailChange: (state, action) => {
      state.email = action.payload;
    },
    passwordChange: (state, action) => {
      state.password = action.payload;
    },
    signInRequested: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.email = '';
      state.password = '';
      state.isAuthenticated = true;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setCurrentUser: (state, action) => {
      state.loading = false;
      state.user = { ...action.payload };
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.email = '';
      state.password = '';
      state.isAuthenticated = false;
    },
    signUpRequested: (state) => {
      state.loading = true;
    },
    signUpSuccess: (state) => {
      state.loading = false;
      state.error = '';
      state.profile = null;
      state.signUpSuccess = true;
    },
    signUpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  emailChange,
  passwordChange,
  signInRequested,
  signInSuccess,
  setCurrentUser,
  signInFailure,
  logout,
  signUpRequested,
  signUpSuccess,
  signUpFailure
} = authSlice.actions;

export default authSlice.reducer;
