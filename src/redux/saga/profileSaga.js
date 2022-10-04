import { takeLatest, call, put, select } from 'redux-saga/effects';
import axios from '../../utils/axios';
import {
  getProfileSuccess,
  getProfileFailure,
  getPostsByUserSuccess,
  getPostsByUserFailure
} from '../profileSlice';

function* getMyProfileSaga(action) {
  try {
    const res = yield call(() => axios.get(`/profile/${action.payload ? action.payload : 'me'}`));
    yield put(getProfileSuccess(res.data));
  } catch (error) {
    yield put(getProfileFailure('Error geting profile'));
  }
}

function* getPostsByUserSaga(action) {
  try {
    const id = yield select((state) => state.user.user.user);
    const res = yield call(() => axios.get(`/posts/user/${action.payload ? action.payload : id}`));
    yield put(getPostsByUserSuccess(res.data));
  } catch (error) {
    yield put(getPostsByUserFailure('Error geting posts'));
  }
}

function* watchProfileSaga() {
  yield takeLatest('profile/getProfileRequested', getMyProfileSaga);
  yield takeLatest('profile/getPostsByUserRequested', getPostsByUserSaga);
}

export default watchProfileSaga;
