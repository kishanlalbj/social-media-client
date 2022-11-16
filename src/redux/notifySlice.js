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
    notifyReadRequested: () => {},
    notifyReadSuccess: (state, action) => {
      for (let i = 0; i < state.notifications.length; i++) {
        if (state.notifications[i]._id === action.payload._id) {
          state.notifications[i].isRead = true;
        }
      }
    },
    notifyReadFailure: () => {},
    clearNotifyRequested: () => {},
    clearNotifySuccess: (state) => {
      state.notifications = [];
    },
    clearNotifyFailure: () => {},
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
  addNotification,
  notifyReadRequested,
  notifyReadSuccess,
  notifyReadFailure,
  clearNotifyRequested,
  clearNotifySuccess,
  clearNotifyFailure
} = notifySlice.actions;

export default notifySlice.reducer;
