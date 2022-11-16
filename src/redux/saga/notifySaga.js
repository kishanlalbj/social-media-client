import { call, put, takeLatest } from 'redux-saga/effects';
import socket from '../../utils/socket';
import axios from '../../utils/axios';
import {
  clearNotifyFailure,
  clearNotifySuccess,
  createNotificationFailed,
  createNotificationSuccess,
  getNotificationsFailed,
  getNotificationsSuccess,
  notifyReadFailure,
  notifyReadSuccess
} from '../notifySlice';

function* getNotifySaga() {
  try {
    const res = yield call(() => axios.get('/notify/all'));
    yield put(getNotificationsSuccess(res.data));
  } catch (error) {
    yield put(getNotificationsFailed(error.response.data.error.message));
  }
}

function* createNotifySaga(action) {
  try {
    const res = yield call(() => axios.post('/notify', { ...action.payload }));
    socket.emit('like_post', res.data);
    yield put(createNotificationSuccess());
  } catch (error) {
    yield put(createNotificationFailed(error.response.data.error.message));
  }
}

function* notifyReadSaga(action) {
  try {
    const res = yield call(() => axios.patch(`/notify/read/${action.payload}`));
    yield put(notifyReadSuccess(res.data));
  } catch (error) {
    yield put(notifyReadFailure());
  }
}

function* clearNotifySaga() {
  try {
    const res = yield call(() => axios.delete('/notify/all'));
    yield put(clearNotifySuccess(res.data));
  } catch (error) {
    yield put(clearNotifyFailure());
  }
}

function* watchNotifySaga() {
  yield takeLatest('notify/getNotificationsRequested', getNotifySaga);
  yield takeLatest('notify/createNotificationRequested', createNotifySaga);
  yield takeLatest('notify/notifyReadRequested', notifyReadSaga);
  yield takeLatest('notify/clearNotifyRequested', clearNotifySaga);
}

export default watchNotifySaga;
