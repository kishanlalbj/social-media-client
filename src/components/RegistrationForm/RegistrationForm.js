import { Box, Button, TextField } from '@mui/material';
import React from 'react';

const RegistrationForm = (props) => {
  const { firstName, lastName, email, password, confirmPassword, onSignUp, onChange } = props;

  return (
    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSignUp}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="firstName"
        label="First Name"
        name="firstName"
        value={firstName}
        onChange={onChange}
        autoFocus
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="lastName"
        label="Last Name"
        name="lastName"
        value={lastName}
        onChange={onChange}
      />
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
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        value={password}
        autoComplete="current-password"
        onChange={onChange}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        autoComplete="current-password"
        onChange={onChange}
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
    </Box>
  );
};

export default RegistrationForm;
