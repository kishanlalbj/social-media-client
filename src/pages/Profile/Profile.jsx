import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { userPostsRequested } from '../../redux/postSlice';
import { getProfileRequested } from '../../redux/profileSlice';
import { getPosts, getProfile, getUser } from '../../selectors';
import ProfileCard from '../../components/ProfileCard';
import PostCard from '../../components/PostCard';
import axios from '../../utils/axios';
import './Profile.css';

const Profile = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { posts, loading } = useAppSelector(getPosts);
  const { user } = useAppSelector(getUser);
  const [showFollowBtn, setShowFollowBtn] = useState(false);
  const [showUnfollowBtn, setShowUnfollowBtn] = useState(false);
  const profile = useAppSelector(getProfile);

  useEffect(() => {
    dispatch(userPostsRequested(id));
    dispatch(getProfileRequested(id));

    if (user.user !== id) {
      getUserFollowers(id);
    } else {
      setShowFollowBtn(false);
      setShowUnfollowBtn(false);
    }
  }, [id]);

  const getUserFollowers = async (id) => {
    const res = await axios.get(`/profile/${user.user}`);
    const { following } = res.data;

    const isFollowing = following.find((item) => item._id === id);

    if (!isFollowing) {
      setShowFollowBtn(true);
      setShowUnfollowBtn(false);
    } else {
      setShowFollowBtn(false);
      setShowUnfollowBtn(true);
    }
  };

  const handleFollow = async () => {
    try {
      await axios.post(`/users/follow/${id}`);
      dispatch(getProfileRequested(id));
      setShowUnfollowBtn(true);
      setShowFollowBtn(false);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.post(`/users/unfollow/${id}`);
      dispatch(getProfileRequested(id));
      setShowFollowBtn(true);
      setShowUnfollowBtn(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile-page-container">
      <div>
        <ProfileCard
          userId={id}
          {...profile}
          showFollowBtn={showFollowBtn}
          showUnfollowBtn={showUnfollowBtn}
          onFollow={handleFollow}
          onUnfollow={handleUnfollow}
        />
      </div>
      <div className="profile-page-posts-container">
        {loading && <div className="loader">Loading</div>}

        {posts.length === 0 && <p>No posts in your feed</p>}

        {posts.map((post) => (
          <PostCard key={post._id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
