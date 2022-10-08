import React, { useEffect } from 'react';
import PostForm from '../../components/PostForm';
import SearchInput from '../../components/Search';
import PostCard from '../../components/PostCard';
import ProfileCard from '../../components/ProfileCard';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postsRequested } from '../../redux/postSlice';
import { getPosts, getProfile, getUser } from '../../selectors';
import { getProfileRequested } from '../../redux/profileSlice';
import { shallowEqual } from 'react-redux';
import Suggesstions from '../../components/Suggesstions';
import './Landing.css';

const Posts = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getUser);
  const profile = useAppSelector(getProfile);
  const { posts, loading, error } = useAppSelector(getPosts, shallowEqual);

  useEffect(() => {
    dispatch(postsRequested());
    dispatch(getProfileRequested(user?.user));
  }, []);

  return (
    <div className="posts-container-root">
      <div className="posts-section-1">
        <SearchInput />
        <ProfileCard userId={user?.user} {...profile} />
      </div>
      <div className="posts-container">
        <PostForm />

        {loading && <div className="loader">Loading</div>}

        {posts.length === 0 && <p>No posts in your feed</p>}

        {posts.map((post) => (
          <PostCard key={post._id} {...post} />
        ))}
      </div>

      <div>
        <Suggesstions />
      </div>

      {/* <Modal header={'Follower'} open={true} /> */}
    </div>
  );
};

export default Posts;
