import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Layout from './Layout/Layout';
import Auth from './pages/Auth';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import ProtectedRoute from './protectedRoute';
import { setCurrentUser } from './redux/authSlice';
import axios from './utils/axios';
import socket from './utils/socket';
import verifyJwt from './utils/verifyJwt';

const App = () => {
  const [loading, setLoding] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = async () => {
    setLoding(true);
    try {
      let res = await axios.get('/auth/me');
      dispatch(setCurrentUser(res.data));
      socket.emit('joinUser', { message: `${res.data.id}` });
      navigate(location.pathname);
    } catch (error) {
      dispatch(setCurrentUser({}));
    } finally {
      setLoding(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('tk');
    if (token && verifyJwt(token)) currentUser();
  }, []);

  if (loading)
    return (
      <Grid container alignItems={'center'} justifyContent="center">
        Loading..
      </Grid>
    );

  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Auth />}></Route>
        </Route>
        <Route path="posts" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Landing></Landing>
              </ProtectedRoute>
            }></Route>
        </Route>

        <Route path="/profile" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }></Route>
        </Route>

        <Route path="/profile/:id" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
