import { LockOutlined } from '@mui/icons-material';
import { Avatar, Grid, Link, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm/LoginForm';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';
import { useAppDispatch, useAppSelector } from '../hooks';
import { signInRequested } from '../redux/authSlice';
import { getAuth } from '../selectors';

const Auth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector(getAuth);
  const [showRegistration, setShowRegistration] = useState(false);

  const [signInForm, setSignInForm] = useState({
    email: '',
    password: ''
  });

  const [signUpForm, setSignUpForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSignInFormChange = (e) => {
    setSignInForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignUpFormChange = (e) => {
    setSignUpForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!signInForm.email || !signInForm.password) return;
    dispatch(signInRequested({ ...signInForm }));
  };

  useEffect(() => {
    if (isAuthenticated) navigate(`/posts`, { replace: true });
  }, [isAuthenticated]);

  return (
    <Grid container component={'main'} sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></Grid>

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            {showRegistration ? 'Sign Up' : 'Sign in'}
          </Typography>

          {!showRegistration ? (
            <>
              <LoginForm
                email={signInForm.email}
                password={signInForm.password}
                onChange={handleSignInFormChange}
                onLogin={handleLogin}
              />
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2" onClick={() => setShowRegistration(true)}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <RegistrationForm
                firstName={signUpForm.firstName}
                lastName={signUpForm.lastName}
                email={signUpForm.email}
                password={signUpForm.password}
                confirmPassword={signUpForm.confirmPassword}
                onChange={handleSignUpFormChange}
              />

              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2" onClick={() => setShowRegistration(false)}>
                    Already have an account ? Sign in
                  </Link>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Auth;
