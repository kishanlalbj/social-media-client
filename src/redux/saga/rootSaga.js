import { all } from 'redux-saga/effects';
import watchUserSaga from './authSaga';
import watchNotifySaga from './notifySaga';
import watchPostSaga from './postSaga';
import watchProfileSaga from './profileSaga';
import watchSuggestionSaga from './suggestionSaga';

function* rootSaga() {
  yield all([
    watchUserSaga(),
    watchPostSaga(),
    watchProfileSaga(),
    watchNotifySaga(),
    watchSuggestionSaga()
  ]);
}

export default rootSaga;
