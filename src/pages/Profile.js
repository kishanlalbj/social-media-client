import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard/PostCard';
import PostCardSkeleton from '../components/PostCard/PostCardSkeleton';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import ProfileCardSkeleton from '../components/ProfileCard/ProfileCardSkeleton';
import { AuthContext } from '../context';
import { useAppDispatch, useAppSelector } from '../hooks';
import { commentPostRequested, likePostRequested } from '../redux/postSlice';
import { getAuth } from '../selectors';
import axios from '../utils/axios';

const Profile = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getAuth);
  const [profile, setProfile] = useState({
    firstName: '',
    loading: false,
    lastNamae: '',
    email: '',
    followers: [],
    following: []
  });

  const [postState, setPostsState] = useState({
    loading: false,
    posts: []
  });

  const [error, setError] = useState(null);

  const getProfile = async () => {
    try {
      setProfile((prev) => {
        return { ...prev, loading: true };
      });
      const res = await axios.get(`/profile/${id}`);
      setProfile((prev) => {
        return { ...prev, ...res.data, loading: false };
      });
    } catch (error) {
      setError(error.response.error.message);
    }
  };

  const getPosts = async () => {
    try {
      setPostsState((prev) => {
        return { ...prev, loading: true };
      });
      const res = await axios.get(`/posts/user/${id}`);
      setPostsState((prev) => {
        return { ...prev, posts: [...res.data], loading: false };
      });
    } catch (error) {
      setError(error.response.error.message);
    }
  };

  const handleLike = (id) => {
    dispatch(likePostRequested(id));
  };

  const handleComment = (id, text) => {
    dispatch(commentPostRequested({ id, text }));
  };

  useEffect(() => {
    getProfile();
    getPosts();
  }, []);

  const renderSkeletons = () => {
    return [1, 2, 3].map((item) => <PostCardSkeleton key={item}></PostCardSkeleton>);
  };

  return (
    <AuthContext.Provider value={{ userId: user.id }}>
      <Grid container spacing={2} justifyContent={'center'}>
        <Grid item xs={12} md={12}>
          {profile?.loading ? <ProfileCardSkeleton /> : <ProfileCard {...profile} />}
        </Grid>
        <Grid item md={12}>
          {postState.loading && renderSkeletons()}
          {postState?.posts.map((post) => {
            let liked = post.likes.includes(user.id);

            return (
              <PostCard
                key={post._id}
                id={post._id}
                firstName={post?.postedBy?.firstName}
                lastName={post.postedBy.lastName}
                comments={post.comment}
                text={post.text}
                createdAt={post.createdAt}
                onLike={handleLike}
                likes={post.likes}
                onComment={handleComment}
                liked={Boolean(liked)}></PostCard>
            );
          })}
        </Grid>
        {error && <p>{error}</p>}
      </Grid>
    </AuthContext.Provider>
  );
};

export default Profile;
