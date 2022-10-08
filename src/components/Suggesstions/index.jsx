import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import customAxios from '../../utils/axios';
import Button from '../Button';
import './index.css';

const Suggesstions = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [followLoading, setFollowLoading] = useState(false);

  const getSuggesstions = async () => {
    try {
      setLoading(true);
      const res = await customAxios.get('/profile/suggesstions');
      setUsers(res.data);
    } catch (error) {
      setError(error.response.data.error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (id) => {
    try {
      setFollowLoading(true);
      await customAxios.post(`/users/follow/${id}`);
      setUsers((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      // console.log(error);
    } finally {
      setFollowLoading(false);
    }
  };

  useEffect(() => {
    getSuggesstions();
  }, []);

  if (loading) return <p className="suggestions-info">Loading</p>;

  return (
    <div className="suggesstions-card">
      <h5>Suggesstions</h5>
      {error && <p className="error-text">Error getting suggestions</p>}

      {users.length === 0 && <p className="suggestions-info">No Suggesstions</p>}

      {users.map((user) => {
        return (
          <div key={user._id} className="suggesstions-list">
            <NavLink to={`/profile/${user._id}`} className="suggesstions-user">
              {user.firstName} {user.lastName}
            </NavLink>
            <Button
              label={followLoading ? 'Loading' : 'Follow'}
              size={'small'}
              disabled={followLoading}
              onClick={() => handleFollow(user._id)}></Button>
          </div>
        );
      })}
    </div>
  );
};

export default Suggesstions;
