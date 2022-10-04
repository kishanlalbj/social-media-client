import React, { useEffect, useState } from 'react';
import Button from '../Button';
import './index.css';

const Registration = (props) => {
  const { onSignUp, error, loading } = props;
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errorMsg, setError] = useState('');

  useEffect(() => {
    setError(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (profile.password !== profile.confirmPassword) {
      setError(`Passwords doesn't match`);

      return;
    }

    onSignUp(profile);
  };

  const handleChange = (e) => {
    setProfile((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  return (
    <div className="registration-card">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h4>New User Registration</h4>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={profile.firstName}
          onChange={handleChange}
          required></input>
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={profile.lastName}
          onChange={handleChange}
          required></input>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          required></input>
        <input
          type="Password"
          placeholder="Password"
          name="password"
          value={profile.password}
          onChange={handleChange}
          required></input>
        <input
          type="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={profile.confirmPassword}
          onChange={handleChange}
          required></input>

        <Button
          type="submit"
          disabled={loading ? true : false}
          primary
          label={loading ? 'Loading..' : 'Sign uP'}></Button>
      </form>
      <br />
      {errorMsg && (
        <div>
          <p className="error-text">{errorMsg}</p>
        </div>
      )}
    </div>
  );
};

export default Registration;
