import { createSlice } from '@reduxjs/toolkit';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
    newPostText: '',
    newPostLoading: false,
    newPostError: '',
    deletePostLoading: false,
    deleteError: ''
  },
  reducers: {
    getPostsRequested: (state) => {
      state.loading = true;
    },
    getPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = [...action.payload].reverse();
    },
    getPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    newPostRequested: (state) => {
      state.newPostLoading = true;
    },
    newPostSuccess: (state, action) => {
      state.newPostLoading = false;
      state.newPostText = '';
      state.posts.unshift({ ...action.payload });
    },
    newPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    onPostTextChange: (state, action) => {
      state.newPostText = action.payload;
    },
    deletePostRequested: (state) => {
      state.deletePostLoading = true;
    },
    deletePostSuccess: (state, action) => {
      state.deletePostLoading = false;
      state.posts = state.posts.filter((ele) => ele._id !== action.payload);
    },
    deletePostFail: (state, action) => {
      state.deletePostLoading = false;
      state.deleteError = action.payload;
    },
    likePostRequested: (state) => {
      state.likeLoader = true;
    },
    likePostSuccess: (state, action) => {
      state.likeLoader = false;

      for (let i = 0; i < state.posts.length; i++) {
        let post = state.posts[i];
        if (post._id === action.payload._id) state.posts[i].likes = [...action.payload.likes];
      }
    },
    likePostFailure: (state, action) => {
      state.likeLoader = false;
      state.likeError = action.payload;
    }
  }
});

export const {
  getPostsRequested,
  getPostsSuccess,
  getPostsFailure,
  newPostRequested,
  newPostSuccess,
  newPostFailure,
  onPostTextChange,
  deletePostRequested,
  deletePostSuccess,
  deletePostFail,
  likePostRequested,
  likePostSuccess,
  likePostFailure
} = postsSlice.actions;

export default postsSlice.reducer;
