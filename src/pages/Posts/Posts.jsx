import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../../components/PostCard';
import PostForm from '../../components/PostForm';
import { useAppSelector } from '../../hooks';
import {
  deletePostRequested,
  getPostsRequested,
  newPostRequested,
  onPostTextChange
} from '../../redux/postSlice';
import './Posts.css';

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, newPostText } = useSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.user);
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
    console.log(id);
    dispatch(deletePostRequested(id));
  };

  return (
    <>
      <div className="posts-container">
        <PostForm
          text={newPostText}
          onTextChange={handleTextChange}
          onShare={handleOnShare}
          error={error}
        />
        {posts.map((post) => (
          <PostCard
            key={post._id}
            {...post}
            isOwner={post.postedBy._id === user?.user ? true : false}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
};

export default Posts;
