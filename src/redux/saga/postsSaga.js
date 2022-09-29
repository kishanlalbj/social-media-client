import { takeLatest, call, put } from 'redux-saga/effects';
import axios from '../../utils/axios';
import {
  getPostsFailure,
  getPostsSuccess,
  newPostSuccess,
  newPostFailure,
  deletePostFail,
  deletePostSuccess,
  likePostSuccess,
  likePostFailure
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

function* likePostSaga(action) {
  try {
    let res = yield call(() => axios.post(`/posts/like/${action.payload}`));

    yield put(likePostSuccess(res.data));
  } catch (error) {
    yield put(likePostFailure('error liking'));
  }
}
function* watchPostsSaga() {
  yield takeLatest('posts/getPostsRequested', getPostsSaga);
  yield takeLatest('posts/newPostRequested', newPostSaga);
  yield takeLatest('posts/deletePostRequested', deletePostSaga);
  yield takeLatest('posts/likePostRequested', likePostSaga);
}

export default watchPostsSaga;
