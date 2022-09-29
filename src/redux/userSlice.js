import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: 'kishanlalbj@gmail.com',
    password: 'test',
    user: null,
    loading: false,
    error: null
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
  logout
} = userSlice.actions;

export default userSlice.reducer;
