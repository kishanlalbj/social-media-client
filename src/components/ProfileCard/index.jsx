import React from 'react';
import './index.css';

const ProfileCard = () => {
  return (
    <div className="profile-card">
      <div className="profile-avatar">
        <img src="/images/default_avatar.svg" alt="avatar"></img>
        <h4>Kishan</h4>
      </div>
      <div className="profile-body">
        <div>
          <h5>Following</h5>
          <center>12</center>
        </div>
        <div>
          <h5>Followers</h5>
          <center>345</center>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
