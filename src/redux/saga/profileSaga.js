import { call, put, takeLatest } from 'redux-saga/effects';
import axios from '../../utils/axios';
import { getProfileFailure, getProfileSuccess } from '../profileSlice';

function* getProfileSaga(action) {
  try {
    const res = yield call(() => axios.get(`/profile/${action.payload}`));

    yield put(getProfileSuccess(res.data));
  } catch (error) {
    yield put(getProfileFailure(error.response.data.error.message));
  }
}

function* watchProfileSaga() {
  yield takeLatest('profile/getProfileRequested', getProfileSaga);
}

export default watchProfileSaga;
