import React from 'react';
import Button from '../Button';
import './index.css';

const LoginForm = (props) => {
  const { email, password, onEmailChange, onPasswordChange, onLogin, loading, error } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(e);
  };

  return (
    <div className="login-card">
      <form onSubmit={handleSubmit}>
        <h4>Login</h4>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
          required></input>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          required></input>
        {loading ? (
          <Button primary={'true'} label="Loading..." disabled></Button>
        ) : (
          <Button primary={'true'} type="submit" label="Login"></Button>
        )}
        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
