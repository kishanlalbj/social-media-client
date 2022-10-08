import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  AiFillDelete,
  AiFillLike,
  AiOutlineComment,
  AiOutlineLike,
  AiOutlineSend
} from 'react-icons/ai';
import './index.css';
import { getUser } from '../../selectors';
import { commentPostRequested, likePostRequested } from '../../redux/postSlice';

const PostCard = (props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getUser);

  const [isOwner, setIsOwner] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState('');

  const { _id, text, postedBy, createdAt, likes = [], comment } = props;

  useEffect(() => {
    if (postedBy._id === user.user) {
      setIsOwner(true);
    }
  }, []);

  useEffect(() => {
    likes.forEach((likedUser) => {
      if (likedUser === user.user) setLiked(true);
      else setLiked(false);
    });
  }, [likes]);

  const handleLikePost = () => {
    dispatch(likePostRequested(_id));
  };

  const handleDeletePost = () => {};

  const handleToggleComment = () => {
    setIsCommentOpen((prev) => !prev);
  };

  const handleComment = () => {
    if (!commentText) return;
    dispatch(commentPostRequested({ id: _id, text: commentText }));
  };

  return (
    <div className="post-card" key={_id}>
      <div className="post-card-header">
        <div className="post-avatar">
          <img src="/images/default_avatar.svg" alt="avatar" width="40"></img>
        </div>

        <div className="post-title">
          <p className="post-user">{postedBy?.firstName}</p>
          <p className="post-date"> {moment(createdAt).fromNow()}</p>
        </div>

        <div className="post-header-actions"></div>
      </div>
      <div className="post-body">
        <p>{text}</p>
      </div>
      <div className="post-card-footer">
        <div>
          <span>
            {likes.length !== 0 && <span className="post-like">{likes.length}</span>}{' '}
            {liked ? (
              <AiFillLike
                color={'#1ea7fd'}
                size={18}
                className="post-actions"
                onClick={handleLikePost}
              />
            ) : (
              <AiOutlineLike size={18} className="post-actions" onClick={handleLikePost} />
            )}
          </span>
        </div>
        <span>
          {comment.length > 0 ? comment.length : null}
          <AiOutlineComment size={18} className="post-actions" onClick={handleToggleComment} />
        </span>
        {isOwner && (
          <AiFillDelete
            size={18}
            color="red"
            className="post-actions"
            onClick={handleDeletePost}></AiFillDelete>
        )}
      </div>
      {isCommentOpen && (
        <div className="comment-section-container">
          {comment.length === 0 && <p className="comment-text">No comments.. Simply waste</p>}

          {comment.map((com) => (
            <div key={com._id} className="comment-section">
              <img
                src="/images/default_avatar.svg"
                className="comment-avatar"
                alt={com.user.firstName}
                title={com.user.firstName}></img>
              <strong className="comment-text">
                {com.user.firstName} {com.user.lastName}
              </strong>
              <p className="comment-text">{com.text}</p>
            </div>
          ))}

          <div className="comment-form">
            <input
              type="text"
              placeholder="Comment"
              className="comment-input"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}></input>
            <AiOutlineSend size={24} className="icon-button" onClick={handleComment} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
