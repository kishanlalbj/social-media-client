import React, { useEffect } from 'react';
import Button from '../Button';
import { useAppDispatch } from '../../hooks';
import { getProfileRequested } from '../../redux/profileSlice';
import './index.css';

const ProfileCard = (props) => {
  const {
    firstName,
    lastName,
    followers,
    following,
    loading,
    showFollowBtn,
    showUnfollowBtn,
    onFollow,
    onUnfollow
  } = props;

  if (loading) return <div className="loader">Loading</div>;

  return (
    <div className="profile-card">
      <div className="profile-avatar">
        <img src="/images/default_avatar.svg" alt="avatar"></img>
        <h4>
          {firstName} {lastName}
        </h4>
        {showFollowBtn && <Button label="Follow" size="small" onClick={onFollow}></Button>}
        {showUnfollowBtn && <Button label="UnFollow" size="small" onClick={onUnfollow}></Button>}
      </div>

      <div className="profile-body">
        <div className="profile-follower-count">
          <div>
            <h5>Following</h5>
            <center>{following ? following.length : 0}</center>
          </div>
          <div>
            <h5>Followers</h5>
            <center>{followers ? followers.length : 0}</center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
