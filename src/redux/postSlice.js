import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  loading: false,
  error: null,
  posts: [],
  selectedPost: {
    loading: false,
    post: null
  }
};

export const postSlice = createSlice({
  name: 'posts',
  initialState: INITIAL_STATE,
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
    userPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = [...action.payload];
      state.error = null;
    },
    userPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
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
    },
    deletePostRequested: () => {},
    deletePostSuccess: (state, action) => {
      state.posts = state.posts.filter((item) => item._id !== action.payload._id);
    },
    deletePostFailure: (state, action) => {
      state.error = action.payload;
    },
    getPostByIdRequested: (state) => {
      state.selectedPost.loading = true;
    },
    getPostByIdSuccess: (state, action) => {
      state.selectedPost.loading = false;
      state.selectedPost.post = action.payload;
    },
    getPostByIdFailure: (state, action) => {
      state.selectedPost.loading = false;
      state.selectedPost.post = null;
      state.selectedPost.error = action.payload;
    },
    resetPosts: () => INITIAL_STATE
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
  userPostsSuccess,
  userPostsFailure,
  commentPostRequested,
  commentPostSuccess,
  commmenrPostFailure,
  deletePostRequested,
  deletePostSuccess,
  deletePostFailure,
  getPostByIdRequested,
  getPostByIdSuccess,
  getPostByIdFailure,
  resetPosts
} = postSlice.actions;

export default postSlice.reducer;
