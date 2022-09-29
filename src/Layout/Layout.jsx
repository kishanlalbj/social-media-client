import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { useAppSelector, useAppDispatch } from '../hooks';
import { logout } from '../redux/userSlice';

const Layout = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem('tk');
    dispatch(logout());
  };

  return (
    <>
      <Header user={user} onLogout={handleLogout} />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
