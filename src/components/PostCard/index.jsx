import moment from 'moment/moment';
import React from 'react';
import { AiFillDelete, AiOutlineComment, AiOutlineLike } from 'react-icons/ai';
import './index.css';

const PostCard = (props) => {
  const { _id, text, postedBy, createdAt, isOwner, onDelete } = props;

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
            <AiOutlineLike size={24} className="post-actions" />
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
