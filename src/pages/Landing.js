import { RefreshOutlined } from '@mui/icons-material';
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Suggestions from '../components/Suggestions/Suggestions';
import PostCard from '../components/PostCard/PostCard';
import PostForm from '../components/PostForm/PostForm';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addPost, likePostRequested, postsRequested } from '../redux/postSlice';
import { followUserRequested, getProfileRequested } from '../redux/profileSlice';
import { getAuth, getPosts, getProfile, getSuggestions } from '../selectors';
import { getSuggestionRequested, removeUserSuggesstion } from '../redux/suggestionSlice';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const { posts, loading, error } = useAppSelector(getPosts);
  const { firstName, lastName, followers, following, profileError } = useAppSelector(getProfile);
  const { users } = useAppSelector(getSuggestions);
  const { user } = useAppSelector(getAuth);
  const [newPostError, setNewPostError] = useState(null);

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

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleProfileClick = (id) => {
    navigate(`/profile/${id}`);
  };

  useEffect(() => {
    dispatch(postsRequested());
  }, [following]);

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
        <PostForm
          text={text}
          onTextChange={handleTextChange}
          onPost={handleNewPost}
          error={newPostError}
        />
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
        <Suggestions users={users} onFollow={handleFollow} onProfileClick={handleProfileClick} />
      </Grid>
    </Grid>
  );
};

export default Landing;
