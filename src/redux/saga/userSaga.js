import { call, takeLatest, put, select } from 'redux-saga/effects';
import axios from '../../utils/axios';
import { loginFailure, loginSuccess, registrationFailure, registrationSuccess } from '../userSlice';
import jwtDecode from 'jwt-decode';

function* workLogin() {
  const { email, password } = yield select((state) => state.user);
  try {
    const res = yield call(() => axios.post('/auth/login', { email, password }));

    if (res.status === 200) {
      const { token } = res.data;
      localStorage.setItem('tk', token);
      const user = jwtDecode(token);
      yield put(loginSuccess(user));
    } else {
      yield put(loginFailure('some error'));
    }
  } catch (error) {
    yield put(loginFailure(error.response.data.error.message));
  }
}

function* registrationSaga(action) {
  try {
    const res = yield call(() => axios.post('/auth/register', { ...action.payload }));
    if (res.status === 200) {
      yield put(registrationSuccess());
    } else {
      yield put(registrationFailure('some error'));
    }
  } catch (error) {
    yield put(registrationFailure(error.response.data.error.message));
  }
}

function* watchUserSaga() {
  yield takeLatest('user/loginRequested', workLogin);
  yield takeLatest('user/registrationRequested', registrationSaga);
}

export default watchUserSaga;
