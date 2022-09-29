import { configureStore } from '@reduxjs/toolkit';
import createSaga from 'redux-saga';
import postsSlice from './postSlice';
import rootSaga from './saga/rootSaga';
import userSlice from './userSlice';

const saga = createSaga();

const store = configureStore({
  reducer: {
    user: userSlice,
    posts: postsSlice
  },
  middleware: [saga]
});

saga.run(rootSaga);

export default store;
