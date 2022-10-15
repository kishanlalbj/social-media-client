import { call, put, takeLatest } from 'redux-saga/effects';
import axios from '../../utils/axios';
import { getSuggestionFailure, getSuggestionSuccess } from '../suggestionSlice';

function* getSuggestionSaga() {
  try {
    const res = yield call(() => axios.get(`/profile/suggestions`));

    yield put(getSuggestionSuccess(res.data));
  } catch (error) {
    yield put(getSuggestionFailure(error.response.data.error.message));
  }
}

function* watchSuggestionSaga() {
  yield takeLatest('suggestions/getSuggestionRequested', getSuggestionSaga);
}

export default watchSuggestionSaga;
