import { takeLatest, call, put } from 'redux-saga/effects';
import axios from '../../utils/axios';
import {
  getPostsFailure,
  getPostsSuccess,
  newPostSuccess,
  newPostFailure,
  deletePostFail,
  deletePostSuccess
} from '../postSlice';

function* getPostsSaga() {
  try {
    const res = yield call(() => axios.get('/posts'));
    yield put(getPostsSuccess(res.data));
  } catch (error) {
    yield put(getPostsFailure('Error geting posts'));
  }
}

function* newPostSaga(action) {
  try {
    const res = yield call(() => axios.post('/posts', { text: action.payload }));
    yield put(newPostSuccess(res.data));
  } catch (error) {
    yield put(newPostFailure('Error posting'));
  }
}

function* deletePostSaga(action) {
  try {
    yield call(() => axios.delete(`/posts/${action.payload}`));

    yield put(deletePostSuccess(action.payload));
  } catch (error) {
    yield put(deletePostFail('error deleting'));
  }
}

function* watchPostsSaga() {
  yield takeLatest('posts/getPostsRequested', getPostsSaga);
  yield takeLatest('posts/newPostRequested', newPostSaga);
  yield takeLatest('posts/deletePostRequested', deletePostSaga);
}

export default watchPostsSaga;
