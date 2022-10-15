import { createSlice } from '@reduxjs/toolkit';

export const notifySlice = createSlice({
  name: 'notify',
  initialState: {
    loading: false,
    notifications: [],
    error: null
  },
  reducers: {
    getNotificationsRequested: (state) => {
      state.loading = true;
    },
    getNotificationsSuccess: (state, action) => {
      state.loading = false;
      state.notifications = [...action.payload];
      state.error = false;
    },
    getNotificationsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createNotificationRequested: (state) => {
      state.loading = true;
    },
    createNotificationSuccess: (state) => {
      state.loading = false;
    },
    createNotificationFailed: (state, action) => {
      state.error = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.unshift({ ...action.payload });
    }
  }
});

export const {
  getNotificationsRequested,
  getNotificationsSuccess,
  getNotificationsFailed,
  createNotificationRequested,
  createNotificationSuccess,
  createNotificationFailed,
  addNotification
} = notifySlice.actions;

export default notifySlice.reducer;
