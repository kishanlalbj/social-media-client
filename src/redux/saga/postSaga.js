import { call, takeLatest, put, select } from 'redux-saga/effects';
import axios from '../../utils/axios';
import { createNotificationRequested } from '../notifySlice';
import {
  postsSuccess,
  postsFailure,
  likePostFailure,
  likePostSuccess,
  commmenrPostFailure,
  commentPostSuccess
} from '../postSlice';

function* getPostSaga() {
  try {
    const res = yield call(() => axios.get('/posts'));
    yield put(postsSuccess(res.data));
  } catch (error) {
    yield put(postsFailure(error.response.data.error.message));
  }
}

function* likePostSaga(action) {
  try {
    const { user } = yield select((state) => state.auth);
    const postId = action.payload;
    const res = yield call(() => axios.post(`/posts/like/${postId}`));
    yield put(likePostSuccess(res.data));
    if (user.id !== res.data.postedBy) {
      const notification = {
        senderId: user.id,
        receiverId: res.data.postedBy,
        text: 'Liked your post'
      };
      yield put(createNotificationRequested(notification));
    }
  } catch (error) {
    yield put(likePostFailure(error.response.data.error.message));
  }
}

function* userPostSaga(action) {
  try {
    const id = action.payload;
    const res = yield call(() => axios.get(`/posts/user/${id}`));
    yield put(postsSuccess(res.data));
  } catch (error) {
    yield put(postsFailure(error.response.data.error.message));
  }
}

function* commentPostSaga(action) {
  try {
    const id = action.payload.id;
    const res = yield call(() =>
      axios.post(`/posts/comment/${id}`, {
        text: action.payload.text
      })
    );
    yield put(commentPostSuccess(res.data));
  } catch (error) {
    yield put(commmenrPostFailure(error.response.data.error.message));
  }
}

function* watchPostSaga() {
  yield takeLatest('posts/postsRequested', getPostSaga);
  yield takeLatest('posts/likePostRequested', likePostSaga);
  yield takeLatest('posts/userPostsRequested', userPostSaga);
  yield takeLatest('posts/commentPostRequested', commentPostSaga);
}

export default watchPostSaga;
