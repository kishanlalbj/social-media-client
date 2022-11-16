import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard/PostCard';
import { AuthContext } from '../context';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  commentPostRequested,
  deletePostRequested,
  getPostByIdRequested,
  likePostRequested
} from '../redux/postSlice';
import { getAuth, getPosts, getSelectedPost } from '../selectors';

const Post = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getAuth);
  const { loading, post } = useAppSelector(getSelectedPost);
  const { posts } = useAppSelector(getPosts);
  const liked = Boolean(post?.likes.includes(user.id));

  useEffect(() => {
    if (id) dispatch(getPostByIdRequested({ id }));
  }, [id, posts]);

  const handleLike = (id) => {
    dispatch(likePostRequested(id));
  };

  const handleDelete = (id) => {
    dispatch(deletePostRequested({ id }));
  };

  const handleComment = (id, text) => {
    dispatch(commentPostRequested({ id, text }));
  };

  useEffect(() => {}, [posts]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <AuthContext.Provider value={{ userId: user.id }}>
        <PostCard
          fullView={true}
          id={post?._id}
          owner={post?.postedBy?._id}
          firstName={post?.postedBy?.firstName}
          lastName={post?.postedBy?.lastName}
          comments={post?.comment}
          text={post?.text}
          createdAt={post?.createdAt}
          onLike={handleLike}
          likes={post?.likes || []}
          liked={Boolean(liked)}
          onComment={handleComment}
          onDelete={handleDelete}
        />
      </AuthContext.Provider>
    </>
  );
};

export default Post;
