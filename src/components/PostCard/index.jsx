import moment from 'moment/moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { AiFillDelete, AiFillLike, AiOutlineComment, AiOutlineLike } from 'react-icons/ai';
import './index.css';
import { getUser } from '../../selectors';

const PostCard = (props) => {
  const { _id, text, postedBy, createdAt, onDelete, onLike, likes = [] } = props;
  console.log('compoenent', likes);
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
          <p className="post-date"> {moment(createdAt).format('LL')}</p>
        </div>

        <div className="post-header-actions"></div>
      </div>
      <div className="post-body">
        {/* <img src="/images/hero-logo.svg" width="50%" height={'100%'}></img> */}
        <p>{text}</p>
      </div>
      <div className="post-card-footer">
        <div>
          <span>
            {liked ? (
              <AiFillLike
                color={'#1ea7fd'}
                size={24}
                className="post-actions"
                onClick={() => onLike(_id)}
              />
            ) : (
              <AiOutlineLike size={24} className="post-actions" onClick={() => onLike(_id)} />
            )}
          </span>
        </div>
        <AiOutlineComment size={24} className="post-actions" />
        {isOwner && (
          <AiFillDelete
            size={24}
            color="red"
            className="post-actions"
            onClick={() => onDelete(_id)}></AiFillDelete>
        )}
      </div>
    </div>
  );
};

export default PostCard;
