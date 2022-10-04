import { all } from 'redux-saga/effects';
import watchPostsSaga from './postsSaga';
import watchUserSaga from './userSaga';
import watchProfileSaga from './profileSaga';

function* rootSaga() {
  yield all([watchUserSaga(), watchPostsSaga(), watchProfileSaga()]);
}

export default rootSaga;
