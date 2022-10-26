import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard/PostCard';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import { useAppDispatch, useAppSelector } from '../hooks';
import { likePostRequested } from '../redux/postSlice';
import { getAuth } from '../selectors';
import axios from '../utils/axios';

const Profile = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getAuth);
  const [profile, setProfile] = useState({
    firstName: '',
    lastNamae: '',
    email: '',
    followers: [],
    following: []
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProfile = async () => {
    try {
      const res = await axios.get(`/profile/${id}`);
      setProfile({ ...res.data });
    } catch (error) {
      setError(error.response.error.message);
    }
  };

  const getPosts = async () => {
    try {
      const res = await axios.get(`/posts/user/${id}`);
      setPosts([...res.data]);
    } catch (error) {
      setError(error.response.error.message);
    }
  };

  const handleLike = (id) => {
    dispatch(likePostRequested(id));
  };

  useEffect(() => {
    getProfile();
    getPosts();
  }, []);

  return (
    <Grid container spacing={2} justifyContent={'center'}>
      <Grid item xs={12} md={12}>
        <ProfileCard {...profile} />
      </Grid>
      <Grid item md={12}>
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
    </Grid>
  );
};

export default Profile;
