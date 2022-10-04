import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Posts from './pages/Posts/Posts';
import Register from './pages/Register/Register';
import ProtectedRoute from './protectedRoute';
import { setCurrentUser } from './redux/userSlice';
import axios from './utils/axios';
import { BiLoaderAlt } from 'react-icons/bi';
import Layout from './Layout/Layout';
import Profile from './pages/Profile/Profile';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoding] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.user) {
      navigate('/profile');
    }
  }, [user]);

  const currentUser = async () => {
    setLoding(true);
    try {
      let res = await axios.get('/auth/me');
      setLoding(false);
      dispatch(setCurrentUser(res.data));
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
              <ProtectedRoute user={user}>
                <Posts />
              </ProtectedRoute>
            }></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <Profile />
              </ProtectedRoute>
            }></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
