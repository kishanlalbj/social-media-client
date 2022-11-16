import { Container } from '@mui/system';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { useAppSelector, useAppDispatch } from '../hooks';
import { logoutRequested } from '../redux/authSlice';
import { getNotificationsRequested, resetNotifications } from '../redux/notifySlice';
import { resetPosts } from '../redux/postSlice';
import { resetProfile } from '../redux/profileSlice';
import { getNotifications } from '../selectors';

const Layout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { notifications } = useAppSelector(getNotifications);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getNotificationsRequested());
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('tk');
    dispatch(logoutRequested());
    dispatch(resetPosts());
    dispatch(resetNotifications());
    dispatch(resetProfile());
  };

  const handleProfileClick = () => {
    navigate('/profile/me');
  };

  return (
    <>
      <Navbar
        authenticated={isAuthenticated}
        onLogout={handleLogout}
        notifications={notifications}
        onProfileClick={handleProfileClick}
      />
      <br />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
