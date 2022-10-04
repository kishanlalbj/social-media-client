import { configureStore } from '@reduxjs/toolkit';
import createSaga from 'redux-saga';
import postReducer from './postSlice';
import userReducer from './userSlice';
import profileReducer from './profileSlice';

import rootSaga from './saga/rootSaga';

const saga = createSaga();

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    profile: profileReducer
  },
  middleware: [saga]
});

saga.run(rootSaga);

export default store;
