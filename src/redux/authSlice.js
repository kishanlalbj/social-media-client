import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  signUpSuccess: false
};

export const authSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
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
    logout: () => INITIAL_STATE,
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
    },
    registrationRequested: (state) => {
      state.loading = true;
    },
    registrationSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
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
  signInRequested,
  signInSuccess,
  setCurrentUser,
  signInFailure,
  logout,
  signUpRequested,
  signUpSuccess,
  signUpFailure,
  registrationRequested,
  registrationSuccess,
  registrationFailure
} = authSlice.actions;

export default authSlice.reducer;
