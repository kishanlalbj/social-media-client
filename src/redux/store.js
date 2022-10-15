import { configureStore } from '@reduxjs/toolkit';
import createSaga from 'redux-saga';
import authReducer from './authSlice';
import postReducer from './postSlice';
import profileReducer from './profileSlice';
import notifyReducer from './notifySlice';
import suggestionSlice from './suggestionSlice';
import rootSaga from './saga/rootSaga';

const saga = createSaga();

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    profile: profileReducer,
    notify: notifyReducer,
    suggestions: suggestionSlice
  },
  middleware: [saga]
});

saga.run(rootSaga);

export default store;
