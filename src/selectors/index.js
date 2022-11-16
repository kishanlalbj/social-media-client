export const getAuth = (state) => state.auth;

export const getProfile = (state) => state.profile;

export const getPosts = (state) => state.posts;

export const getNotifications = (state) => state.notify;

export const getSuggestions = (state) => state.suggestions;

export const getProfileSearch = (state) => {
  const { profileSearch } = getProfile(state);

  return profileSearch;
};

export const getSelectedPost = (state) => {
  const { selectedPost } = getPosts(state);

  return selectedPost;
};
