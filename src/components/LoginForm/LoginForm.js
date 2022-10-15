import React from 'react';
import { Box, Button, TextField } from '@mui/material';

const LoginForm = (props) => {
  const { email, password, onChange, onLogin } = props;

  return (
    <Box component="form" noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        value={email}
        autoComplete="email"
        onChange={onChange}
        autoFocus
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        value={password}
        label="Password"
        type="password"
        id="password"
        onChange={onChange}
        autoComplete="current-password"
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={onLogin}>
        Sign In
      </Button>
    </Box>
  );
};

export default LoginForm;
