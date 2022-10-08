import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'user',
  initialState: {
    email: 'john_doe@gmail.com',
    password: 'test',
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    registrationSuccess: false
  },
  reducers: {
    emailChange: (state, action) => {
      state.email = action.payload;
    },
    passwordChange: (state, action) => {
      state.password = action.payload;
    },
    loginRequested: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.email = '';
      state.password = '';
      state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
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
    registrationRequested: (state) => {
      state.loading = true;
    },
    registrationSuccess: (state) => {
      state.loading = false;
      state.error = '';
      state.profile = null;
      state.registrationSuccess = true;
    },
    registrationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  emailChange,
  passwordChange,
  loginRequested,
  loginSuccess,
  setCurrentUser,
  loginFailure,
  logout,
  registrationRequested,
  registrationSuccess,
  registrationFailure
} = authSlice.actions;

export default authSlice.reducer;
