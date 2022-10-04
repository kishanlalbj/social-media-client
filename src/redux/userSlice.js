import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: 'kishanlalbj@gmail.com',
    password: 'test',
    user: null,
    loading: false,
    profile: {},
    error: null,
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
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setCurrentUser: (state, action) => {
      state.user = { ...action.payload };
    },
    logout: (state) => {
      state.user = null;
      state.email = '';
      state.password = '';
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
} = userSlice.actions;

export default userSlice.reducer;
