import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
  name: 'posts',
  initialState: {
    loading: false,
    error: null,
    posts: []
  },
  reducers: {
    postsRequested: (state) => {
      state.loading = true;
    },
    postsSuccess: (state, action) => {
      state.loading = false;
      state.posts = [...action.payload];
      state.error = null;
    },
    postsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    likePostRequested: () => {
      // state.loading = true;
    },
    likePostSuccess: (state, action) => {
      state.loading = false;
      for (let i = 0; i < state.posts.length; i++) {
        if (state.posts[i]._id === action.payload._id) {
          state.posts[i].likes = [...action.payload.likes];
        }
      }
    },
    likePostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addPost: (state, action) => {
      state.posts.unshift({ ...action.payload });
    },
    userPostsRequested: (state) => {
      state.loading = true;
    },
    commentPostRequested: (state) => {
      state.loading = true;
    },
    commentPostSuccess: (state, action) => {
      state.loading = false;
      for (let i = 0; i < state.posts.length; i++) {
        if (state.posts[i]._id === action.payload._id) {
          state.posts[i].comment = [...action.payload.comment];
        }
      }
    },
    commmenrPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  postsRequested,
  postsSuccess,
  postsFailure,
  likePostRequested,
  likePostSuccess,
  likePostFailure,
  addPost,
  userPostsRequested,
  commentPostRequested,
  commentPostSuccess,
  commmenrPostFailure
} = postSlice.actions;

export default postSlice.reducer;
