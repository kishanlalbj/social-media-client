import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getPostsByUserRequested, getProfileRequested } from '../../redux/profileSlice';
import PostCard from '../../components/PostCard';
import { getProfile } from '../../selectors';
import './Profile.css';

const Profile = () => {
  const { firstName, lastName, email, followers, following, posts } = useAppSelector(getProfile);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (!id || id === 'me') {
      dispatch(getProfileRequested());
      dispatch(getPostsByUserRequested());

      return;
    }

    dispatch(getProfileRequested(id));
    dispatch(getPostsByUserRequested(id));
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-page-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <img src="/images/default_avatar.svg" alt="avatar"></img>
          </div>
          <div>
            <h4>
              {firstName} {lastName}
            </h4>
            <div className="profile-followers-container">
              <div className="profile-followers">
                <p>Followers</p>
                <center>{followers.length}</center>
              </div>
              <div className="profile-following">
                <p>Following</p>
                <center>{following.length}</center>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-body">
          <p>{email}</p>
        </div>
      </div>

      <div className="posts-container">
        {posts.map((post) => (
          <PostCard key={post._id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
