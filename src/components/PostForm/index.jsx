import React from 'react';
import Button from '../Button';
import './index.css';

const PostForm = (props) => {
  const { text, onShare, onTextChange, error } = props;

  return (
    <div className="post-form-card">
      <div className="post-form-container">
        <div className="user-avatar">
          <img src="/images/default_avatar.svg" width="50"></img>
        </div>
        <div className="post-form">
          <form>
            <textarea
              rows={4}
              placeholder="What's on your mind today"
              className="post-textarea"
              value={text}
              onChange={onTextChange}
              required></textarea>
          </form>
        </div>
      </div>
      <div className="post-form-actions">
        <Button primary label="Share" onClick={onShare}></Button>
      </div>
      <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>
    </div>
  );
};

export default PostForm;
