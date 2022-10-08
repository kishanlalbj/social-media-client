import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import Registration from '../../components/RegistrationForm';
import {
  emailChange,
  loginRequested,
  passwordChange,
  registrationRequested
} from '../../redux/authSlice';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password, loading, error, user } = useSelector((state) => state.auth);

  const [showRegistration, setShowRegistration] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault;
    dispatch(loginRequested());
  };

  const handleOpenRegistration = (e) => {
    e.preventDefault();
    setShowRegistration((prev) => !prev);
  };

  useEffect(() => {
    if (user && user.user && location.pathname === '/login') {
      navigate(`/posts`, { replace: true });
    }
  }, [user]);

  const handleSignUp = (profile) => {
    dispatch(registrationRequested(profile));
  };

  return (
    <div className="landing-container">
      <div className="landing-forms">
        {!showRegistration ? (
          <>
            <LoginForm
              email={email}
              password={password}
              onEmailChange={(e) => dispatch(emailChange(e.target.value))}
              onPasswordChange={(e) => dispatch(passwordChange(e.target.value))}
              onLogin={handleLogin}
              loading={loading}
              error={error}
            />

            <div className="auth-links">
              <span>
                New User ?{' '}
                <a href="/" onClick={handleOpenRegistration}>
                  Sign Up
                </a>
              </span>
            </div>
          </>
        ) : (
          <>
            <Registration onSignUp={handleSignUp} error={error} loading={loading} />
            <div className="auth-links">
              <span>
                Already have an account ?
                <a href="/" onClick={handleOpenRegistration}>
                  Sign in{' '}
                </a>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
