import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import { emailChange, loginRequested, passwordChange } from '../../redux/userSlice';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password, loading, error, user } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault;
    dispatch(loginRequested());
  };

  useEffect(() => {
    if (user && user.user) navigate('/posts');
  }, [user]);

  return (
    <div className="landing-container">
      <div className="landing-forms">
        <LoginForm
          email={email}
          password={password}
          onEmailChange={(e) => dispatch(emailChange(e.target.value))}
          onPasswordChange={(e) => dispatch(passwordChange(e.target.value))}
          onLogin={handleLogin}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default Login;
