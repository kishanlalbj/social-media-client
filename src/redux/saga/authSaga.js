import { call, takeLatest, put } from 'redux-saga/effects';
import axios from '../../utils/axios';
import {
  logoutFailure,
  logoutSuccess,
  refreshTokenFailure,
  signInFailure,
  signInSuccess,
  signUpFailure,
  signUpSuccess
} from '../authSlice';
import jwtDecode from 'jwt-decode';

function* workLogin(action) {
  const { email, password } = action.payload;

  try {
    const res = yield call(() => axios.post('/auth/login', { email, password }));

    if (res.status === 200) {
      const { token } = res.data;
      localStorage.setItem('tk', token);
      const user = jwtDecode(token);
      yield put(signInSuccess({ user }));
    } else {
      yield put(signInFailure('some error'));
    }
  } catch (error) {
    yield put(signInFailure(error.response.data.error.message));
  }
}

function* registrationSaga(action) {
  try {
    const res = yield call(() => axios.post('/auth/register', { ...action.payload }));
    if (res.status === 200) {
      yield put(signUpSuccess());
    } else {
      yield put(signUpFailure('some error'));
    }
  } catch (error) {
    yield put(signUpFailure(error.response.data.error.message));
  }
}

function* refreshTokenSaga() {
  try {
    const res = yield call(() => axios.post('/auth/refresh-token'));
    const { token } = res.data;
    localStorage.setItem('tk', token);
    const user = jwtDecode(token);

    yield put(signInSuccess(user));
  } catch (error) {
    yield put(refreshTokenFailure(error.response.data.error.message));
  }
}

function* logoutSaga() {
  try {
    yield call(() => axios.delete('/auth/logout'));
    localStorage.removeItem('tk');
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure(error.response.data.message));
  }
}

function* watchUserSaga() {
  yield takeLatest('user/signInRequested', workLogin);
  yield takeLatest('user/signUpRequested', registrationSaga);
  yield takeLatest('user/refreshTokenRequested', refreshTokenSaga);
  yield takeLatest('user/logoutRequested', logoutSaga);
}

export default watchUserSaga;
