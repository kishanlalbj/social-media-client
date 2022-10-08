import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { addPost } from '../../redux/postSlice';
import customAxios from '../../utils/axios';
import Button from '../Button';
import './index.css';

const PostForm = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const createNewpost = async () => {
    try {
      setLoading(true);

      const res = await customAxios.post('/posts', { text });
      setText('');
      dispatch(addPost(res.data));
    } catch (error) {
      setError(error.response.data.error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (!text) {
      setError('Text required');

      setTimeout(() => {
        setError('');
      }, 2000);

      return;
    }

    createNewpost();
  };

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
              onChange={handleChange}
              required></textarea>
          </form>
        </div>
      </div>
      <div className="post-form-actions">
        <Button
          primary={'true'}
          size="small"
          disabled={loading}
          label={loading ? 'Loading' : 'Share'}
          onClick={handleShare}></Button>
      </div>
      <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>
    </div>
  );
};

export default PostForm;
