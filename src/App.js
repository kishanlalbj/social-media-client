import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { BiLoaderAlt } from 'react-icons/bi';

import Login from './pages/Login/Login';
import Landing from './pages/Landing/Landing';
import Register from './pages/Register/Register';
import ProtectedRoute from './protectedRoute';
import { setCurrentUser } from './redux/authSlice';
import axios from './utils/axios';
import Layout from './Layout/Layout';
import NotFound from './pages/NotFound/NotFound';
import Profile from './pages/Profile/Profile';

const App = () => {
  const [loading, setLoding] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = async () => {
    setLoding(true);
    try {
      let res = await axios.get('/auth/me');
      setLoding(false);
      dispatch(setCurrentUser(res.data));
      navigate(location.pathname);
    } catch (error) {
      setLoding(false);
      setCurrentUser({});
    }
  };

  useEffect(() => {
    currentUser();
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <BiLoaderAlt size={54} className="loader-icon" />
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route path="/" element={<Navigate to="/login"></Navigate>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <Landing />
              </ProtectedRoute>
            }></Route>

          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }></Route>

          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
