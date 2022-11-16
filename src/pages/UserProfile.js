import { Alert, Button, Card, CardActions, CardContent, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import axios from '../utils/axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import ProfileCardSkeleton from '../components/ProfileCard/ProfileCardSkeleton';
import { useAppSelector } from '../hooks';
import { getProfileRequested, unfollowRequested } from '../redux/profileSlice';
import { getAuth, getProfile } from '../selectors';

const UserProfile = () => {
  const { firstName, lastName, followers, following, loading } = useAppSelector(getProfile);
  const { user } = useAppSelector(getAuth);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/profile/${user.id}`);

      setUserData((prev) => {
        return {
          ...prev,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email
        };
      });
      setError(null);
    } catch (error) {
      setError(error.response.data.error.message);
    }
  };

  const saveUser = async () => {
    try {
      const { data } = await axios.patch(`/users/edit/${user.id}`, {
        ...userData
      });

      dispatch(getProfileRequested(data._id));
      setError(null);
      setMessage('User saved');
    } catch (error) {
      setError(error.response.data.error.message);
    }
  };

  useEffect(() => {
    dispatch(getProfileRequested(user.id));
    fetchUser();
  }, []);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (error) setError(null);
      if (message) setMessage(null);
    }, 2000);

    () => {
      clearInterval(timer);
    };
  }, [user, message]);

  const handleUnFollow = (id) => {
    dispatch(unfollowRequested(id));
  };

  const handleChange = (e) => {
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleSave = () => {
    saveUser();
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-avatar">
        {loading ? (
          <ProfileCardSkeleton></ProfileCardSkeleton>
        ) : (
          <div>
            <ProfileCard
              firstName={firstName}
              lastName={lastName}
              followers={followers}
              onUnfollow={handleUnFollow}
              following={following}
            />
          </div>
        )}
      </div>

      <div style={{ width: '100%' }}>
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <form>
              <Stack gap={'20px'}>
                <TextField
                  placeholder="First Name"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}></TextField>

                <TextField
                  placeholder="Last Name"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}></TextField>

                <TextField
                  disabled
                  placeholder="Email"
                  name="firstName"
                  value={userData.email}
                  onChange={handleChange}></TextField>
              </Stack>
            </form>
          </CardContent>

          <CardActions>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </CardActions>
        </Card>

        <div style={{ marginTop: '10px' }}>
          {message && (
            <Alert variant="outlined" severity="info">
              {message}
            </Alert>
          )}
          {error && (
            <Alert variant="outlined" severity="error">
              {error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
