import { call, put, takeLatest } from 'redux-saga/effects';
import axios from '../../utils/axios';
import {
  followUserFailure,
  followUserSuccess,
  getProfileFailure,
  getProfileSuccess,
  searchProfileFailure,
  searchProfileSuccess,
  unfollowFailure,
  unfollowSuccess
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

function* searchProfileSaga(action) {
  try {
    const query = action.payload;
    const res = yield call(() => axios.post(`/profile/search`, { query }));
    yield put(searchProfileSuccess(res.data));
  } catch (error) {
    yield put(searchProfileFailure(error.response.error.message));
  }
}

function* unFollowSaga(action) {
  try {
    const res = yield call(() => axios.post(`/users/unfollow/${action.payload}`));
    yield put(unfollowSuccess(res.data._id));
  } catch (error) {
    yield put(unfollowFailure(error.response.error.message));
  }
}

function* watchProfileSaga() {
  yield takeLatest('profile/getProfileRequested', getProfileSaga);
  yield takeLatest('profile/followUserRequested', followUserSaga);
  yield takeLatest('profile/searchProfileRequested', searchProfileSaga);
  yield takeLatest('profile/unfollowRequested', unFollowSaga);
}

export default watchProfileSaga;
