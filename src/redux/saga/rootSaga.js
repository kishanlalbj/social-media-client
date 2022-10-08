import { all } from 'redux-saga/effects';
import watchUserSaga from './authSaga';
import watchPostSaga from './postSaga';
import watchProfileSaga from './profileSaga';

function* rootSaga() {
  yield all([watchUserSaga(), watchPostSaga(), watchProfileSaga()]);
}

export default rootSaga;
