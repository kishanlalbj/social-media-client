import { createSelector } from '@reduxjs/toolkit';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../../components/PostCard';
import PostForm from '../../components/PostForm';
import ProfileCard from '../../components/ProfileCard';
import SearchInput from '../../components/Search';
import { useAppSelector } from '../../hooks';
import {
  deletePostRequested,
  getPostsRequested,
  likePostRequested,
  newPostRequested,
  onPostTextChange
} from '../../redux/postSlice';
import './Posts.css';

const Posts = () => {
  const dispatch = useDispatch();

  const { posts, newPostText } = useAppSelector((state) => state.posts);
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(getPostsRequested());
  }, []);

  const handleOnShare = () => {
    if (!newPostText) {
      setError('Post text is required');
      setTimeout(() => {
        setError('');
      }, 2000);

      return;
    }

    dispatch(newPostRequested(newPostText));
  };

  const handleTextChange = (e) => {
    dispatch(onPostTextChange(e.target.value));
  };

  const handleDelete = (id) => {
    dispatch(deletePostRequested(id));
  };

  const handleLike = (id) => {
    dispatch(likePostRequested(id));
  };

  return (
    <div className="posts-container-root">
      <div className="posts-section-1">
        <SearchInput />
        <ProfileCard />
      </div>
      <div className="posts-container">
        <PostForm
          text={newPostText}
          onTextChange={handleTextChange}
          onShare={handleOnShare}
          error={error}
        />

        {posts.map((post) => (
          <PostCard key={post._id} {...post} onLike={handleLike} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
