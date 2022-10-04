import moment from 'moment/moment';
import React, { useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { AiFillDelete, AiFillLike, AiOutlineComment, AiOutlineLike } from 'react-icons/ai';
import './index.css';
import { getUser } from '../../selectors';

const PostCard = (props) => {
  const { _id, text, postedBy, createdAt, onDelete, onLike, likes = [] } = props;
  const { user } = useAppSelector(getUser);
  const isOwner = postedBy._id === user.user;
  let liked = false;

  likes.forEach((likedUser) => {
    if (likedUser._id === user.user) liked = true;
  });

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
                onClick={() => onLike(_id)}
              />
            ) : (
              <AiOutlineLike size={18} className="post-actions" onClick={() => onLike(_id)} />
            )}
          </span>
        </div>
        <AiOutlineComment size={18} className="post-actions" />
        {isOwner && (
          <AiFillDelete
            size={18}
            color="red"
            className="post-actions"
            onClick={() => onDelete(_id)}></AiFillDelete>
        )}
      </div>
    </div>
  );
};

export default PostCard;
