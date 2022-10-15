import { RefreshOutlined } from '@mui/icons-material';
import { Alert, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import Suggestions from '../components/Suggestions/Suggestions';
import PostCard from '../components/PostCard/PostCard';
import PostForm from '../components/PostForm/PostForm';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import { useAppDispatch, useAppSelector } from '../hooks';
import { likePostRequested, postsRequested } from '../redux/postSlice';
import { getProfileRequested } from '../redux/profileSlice';
import { getAuth, getPosts, getProfile, getSuggestions } from '../selectors';
import { getSuggestionRequested } from '../redux/suggestionSlice';

const Landing = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector(getPosts);
  const { firstName, lastName, followers, following, profileError } = useAppSelector(getProfile);
  const { users } = useAppSelector(getSuggestions);
  const { user } = useAppSelector(getAuth);

  useEffect(() => {
    dispatch(postsRequested());
    dispatch(getProfileRequested(user.id));
    dispatch(getSuggestionRequested());
  }, []);

  const handleLike = (id) => {
    dispatch(likePostRequested(id));
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
        <ProfileCard
          firstName={firstName}
          lastName={lastName}
          followers={followers}
          following={following}
          error={profileError}
        />
      </Grid>

      <Grid item md={6} xs={12}>
        <PostForm />
        {loading && <RefreshOutlined />}
        {posts.map((post) => {
          let liked = post.likes.includes(user.id);

          return (
            <PostCard
              key={post._id}
              id={post._id}
              firstName={post?.postedBy?.firstName}
              lastName={post.postedBy.lastName}
              text={post.text}
              createdAt={post.createdAt}
              onLike={handleLike}
              likes={post.likes}
              liked={Boolean(liked)}></PostCard>
          );
        })}
      </Grid>

      <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Suggestions users={users} />
      </Grid>
    </Grid>
  );
};

export default Landing;
