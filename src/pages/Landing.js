import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Suggestions from '../components/Suggestions/Suggestions';
import PostCard from '../components/PostCard/PostCard';
import PostForm from '../components/PostForm/PostForm';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import Search from '../components/Search/Search';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  addPost,
  commentPostRequested,
  deletePostRequested,
  likePostRequested,
  postsRequested
} from '../redux/postSlice';
import {
  followUserRequested,
  getProfileRequested,
  searchProfileRequested,
  unfollowRequested
} from '../redux/profileSlice';
import {
  getAuth,
  getNotifications,
  getPosts,
  getProfile,
  getProfileSearch,
  getSuggestions
} from '../selectors';
import { getSuggestionRequested, removeUserSuggesstion } from '../redux/suggestionSlice';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context';
import { Stack } from '@mui/system';
import PostCardSkeleton from '../components/PostCard/PostCardSkeleton';
import ProfileCardSkeleton from '../components/ProfileCard/ProfileCardSkeleton';
import SuggestionsSkeleton from '../components/Suggestions/SuggestionsSkeleton';
import NotificationCard from '../components/NotificationCard/NotificationCard';

const Landing = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const { posts, loading } = useAppSelector(getPosts);
  const {
    firstName,
    lastName,
    followers,
    following,
    profileError,
    loading: profileLoading
  } = useAppSelector(getProfile);
  const { users, loading: suggLoading } = useAppSelector(getSuggestions);
  const { user } = useAppSelector(getAuth);
  const [newPostError, setNewPostError] = useState(null);
  const profileSearch = useAppSelector(getProfileSearch);
  const { notifications } = useAppSelector(getNotifications);

  useEffect(() => {
    dispatch(postsRequested());
    dispatch(getProfileRequested(user.id));
    dispatch(getSuggestionRequested());
  }, []);

  const handleLike = (id) => {
    dispatch(likePostRequested(id));
  };
  const handleFollow = (id) => {
    dispatch(followUserRequested(id));
    dispatch(removeUserSuggesstion(id));
  };

  const handleNewPost = async () => {
    try {
      const res = await axios.post('/posts', { text });
      dispatch(addPost(res.data));
      setText('');
    } catch (error) {
      setNewPostError(error.response.data.error.message);
    }
  };

  const handlePostClick = (id) => {
    navigate(`/posts/${id}`);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleProfileClick = (id) => {
    navigate(`/profile/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deletePostRequested({ id }));
  };

  const handleComment = (id, text) => {
    dispatch(commentPostRequested({ id, text }));
  };

  const handleUnFollow = (id) => {
    dispatch(unfollowRequested(id));
  };

  let timer;
  const handleSearch = (query) => {
    clearInterval(timer);
    timer = setTimeout(() => {
      dispatch(searchProfileRequested(query));
    }, 500);
  };

  const renderSkeletons = () => {
    return [1, 2, 3].map((item) => <PostCardSkeleton key={item}></PostCardSkeleton>);
  };

  useEffect(() => {
    dispatch(postsRequested());
  }, [following]);

  return (
    <AuthContext.Provider value={{ userId: user.id, name: `${user.name}` }}>
      <Grid container spacing={2}>
        <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Stack spacing={2}>
            <Search
              loading={profileSearch?.loading}
              options={profileSearch?.result}
              onSearch={handleSearch}
              onOptionClick={handleProfileClick}
            />

            {profileLoading ? (
              <ProfileCardSkeleton />
            ) : (
              <ProfileCard
                firstName={firstName}
                lastName={lastName}
                followers={followers}
                following={following}
                onUnfollow={handleUnFollow}
                error={profileError}
              />
            )}
          </Stack>
        </Grid>

        <Grid item md={6} xs={12}>
          <PostForm
            text={text}
            onTextChange={handleTextChange}
            onPost={handleNewPost}
            error={newPostError}
          />
          {loading && renderSkeletons()}
          {posts.map((post) => {
            let liked = post.likes.includes(user.id);

            return (
              <PostCard
                key={post._id}
                id={post._id}
                owner={post?.postedBy?._id}
                firstName={post?.postedBy?.firstName}
                lastName={post.postedBy?.lastName}
                comments={post.comment}
                text={post.text}
                createdAt={post.createdAt}
                onLike={handleLike}
                likes={post.likes}
                liked={Boolean(liked)}
                onComment={handleComment}
                onPostClick={handlePostClick}
                onDelete={handleDelete}></PostCard>
            );
          })}
        </Grid>

        <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Stack gap="10px">
            <NotificationCard
              notifications={notifications}
              onNotifyClear={() => {}}
              onNotifyOpen={() => {}}
            />
            {suggLoading ? (
              <SuggestionsSkeleton />
            ) : (
              <Suggestions
                users={users}
                onFollow={handleFollow}
                onProfileClick={handleProfileClick}
              />
            )}
          </Stack>
        </Grid>
      </Grid>
    </AuthContext.Provider>
  );
};

export default Landing;
