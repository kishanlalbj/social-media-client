import { call, put, takeLatest } from 'redux-saga/effects';
import socket from '../../utils/socket';
import axios from '../../utils/axios';
import {
  createNotificationFailed,
  createNotificationSuccess,
  getNotificationsFailed,
  getNotificationsSuccess
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

function* watchNotifySaga() {
  yield takeLatest('notify/getNotificationsRequested', getNotifySaga);
  yield takeLatest('notify/createNotificationRequested', createNotifySaga);
}

export default watchNotifySaga;
