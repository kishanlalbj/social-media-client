import { all } from 'redux-saga/effects';
import watchPostsSaga from './postsSaga';
import watchUserSaga from './userSaga';

function* rootSaga() {
  yield all([watchUserSaga(), watchPostsSaga()]);
}

export default rootSaga;
