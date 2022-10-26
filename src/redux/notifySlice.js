import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  loading: false,
  notifications: [],
  error: null
};

export const notifySlice = createSlice({
  name: 'notify',
  initialState: INITIAL_STATE,
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
    },
    resetNotifications: () => INITIAL_STATE
  }
});

export const {
  getNotificationsRequested,
  getNotificationsSuccess,
  getNotificationsFailed,
  createNotificationRequested,
  createNotificationSuccess,
  createNotificationFailed,
  resetNotifications,
  addNotification
} = notifySlice.actions;

export default notifySlice.reducer;
