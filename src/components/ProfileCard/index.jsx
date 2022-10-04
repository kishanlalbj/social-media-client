import React from 'react';
import './index.css';

const ProfileCard = (props) => {
  const { firstName, lastName, email, followers, following } = props;

  return (
    <div className="profile-card">
      <div className="profile-avatar">
        <img src="/images/default_avatar.svg" alt="avatar"></img>
        <h4>
          {firstName} {lastName}
        </h4>
      </div>
      <div className="profile-body">
        <div className="profile-follower-count">
          <div>
            <h5>Following</h5>
            <center>{following.length}</center>
          </div>
          <div>
            <h5>Followers</h5>
            <center>{followers.length}</center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
