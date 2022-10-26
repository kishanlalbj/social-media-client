import { Container } from '@mui/system';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { useAppSelector, useAppDispatch } from '../hooks';
import { logout } from '../redux/authSlice';
import { getNotificationsRequested, resetNotifications } from '../redux/notifySlice';
import { resetPosts } from '../redux/postSlice';
import { resetProfile } from '../redux/profileSlice';
import { getNotifications } from '../selectors';

const Layout = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { notifications } = useAppSelector(getNotifications);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getNotificationsRequested());
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('tk');
    dispatch(logout());
    dispatch(resetPosts());
    dispatch(resetNotifications());
    dispatch(resetProfile());
  };

  return (
    <>
      <Navbar
        authenticated={isAuthenticated}
        onLogout={handleLogout}
        notifications={notifications}
      />
      <br />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
