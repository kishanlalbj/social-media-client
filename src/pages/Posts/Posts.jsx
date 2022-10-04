import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../../components/Modal';
import PostCard from '../../components/PostCard';
import PostForm from '../../components/PostForm';
import ProfileCard from '../../components/ProfileCard';
import SearchInput from '../../components/Search';
import Suggesstions from '../../components/Suggesstions';
import { useAppSelector } from '../../hooks';
import {
  deletePostRequested,
  getPostsRequested,
  likePostRequested,
  newPostRequested,
  onPostTextChange
} from '../../redux/postSlice';
import { getProfileRequested } from '../../redux/profileSlice';
import { getProfile } from '../../selectors';
import axios from '../../utils/axios';
import './Posts.css';

const Posts = () => {
  const dispatch = useDispatch();

  const { posts, newPostText } = useAppSelector((state) => state.posts);
  const { firstName, lastName, followers, following, email } = useAppSelector(getProfile);
  const [error, setError] = useState('');

  const [suggesstions, setSuggesstions] = useState([]);
  const [isSuggesstionsLoading, setSuggesstionsLoading] = useState(false);
  const [suggesstionsError, setSuggesstionsError] = useState('');

  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const [followError, setFollowError] = useState('');

  useEffect(() => {
    dispatch(getPostsRequested());
    dispatch(getProfileRequested());
    getSuggesstions();
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

  const getSuggesstions = async () => {
    setSuggesstionsLoading(true);
    try {
      const res = await axios.get('/profile/suggesstions');
      setSuggesstionsLoading(false);
      if (res.status !== 200) {
        setSuggesstionsError('Error geting suggesstions');

        return;
      }
      setSuggesstions([...res.data]);
    } catch (error) {
      setSuggesstionsLoading(false);
      setSuggesstionsError(error.response.data.error.message);
    }
  };

  const handleFollow = async (id) => {
    try {
      setIsFollowLoading(true);

      await axios.post('/users/follow/' + id);
      setIsFollowLoading(false);
      dispatch(getPostsRequested());
      dispatch(getProfileRequested());
      getSuggesstions();
    } catch (error) {
      setIsFollowLoading(false);
      setFollowError(error.response.data.error.message);
    }
  };

  return (
    <div className="posts-container-root">
      <div className="posts-section-1">
        <SearchInput />
        <ProfileCard
          firstName={firstName}
          lastName={lastName}
          email={email}
          followers={followers}
          following={following}
        />
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

      <div className="suggesstions-container">
        <Suggesstions
          suggesstions={suggesstions}
          loading={isSuggesstionsLoading}
          error={suggesstionsError || followError}
          onFollow={handleFollow}
        />
      </div>

      {/* <Modal header={'Follower'} open={true} /> */}
    </div>
  );
};

export default Posts;
