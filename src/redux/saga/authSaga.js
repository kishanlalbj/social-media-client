import { call, takeLatest, put, select } from 'redux-saga/effects';
import axios from '../../utils/axios';
import { signInFailure, signInSuccess, signUpFailure, signUpSuccess } from '../authSlice';
import jwtDecode from 'jwt-decode';

function* workLogin(action) {
  const { email, password } = action.payload;

  try {
    const res = yield call(() => axios.post('/auth/login', { email, password }));

    if (res.status === 200) {
      const { token } = res.data;
      localStorage.setItem('tk', token);
      const user = jwtDecode(token);
      yield put(signInSuccess(user));
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

function* watchUserSaga() {
  yield takeLatest('user/signInRequested', workLogin);
  yield takeLatest('user/signUpRequested', registrationSaga);
}

export default watchUserSaga;
