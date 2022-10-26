import { call, put, takeLatest } from 'redux-saga/effects';
import axios from '../../utils/axios';
import {
  followUserFailure,
  followUserSuccess,
  getProfileFailure,
  getProfileSuccess
} from '../profileSlice';

function* getProfileSaga(action) {
  try {
    const res = yield call(() => axios.get(`/profile/${action.payload}`));

    yield put(getProfileSuccess(res.data));
  } catch (error) {
    yield put(getProfileFailure(error.response.data.error.message));
  }
}

function* followUserSaga(action) {
  try {
    const res = yield call(() => axios.post(`/users/follow/${action.payload}`));
    yield put(followUserSuccess(res.data));
  } catch (error) {
    yield put(followUserFailure(error.response.data.error.message));
  }
}

function* watchProfileSaga() {
  yield takeLatest('profile/getProfileRequested', getProfileSaga);
  yield takeLatest('profile/followUserRequested', followUserSaga);
}

export default watchProfileSaga;
