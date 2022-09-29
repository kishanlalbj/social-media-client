import React from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';
import './header.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  const { user, onLogout } = props;

  return (
    <header>
      <div className="wrapper">
        <div>
          <h1>Social Media</h1>
        </div>
        <div>
          {user ? (
            <>
              <Button size="small" label="Logout" onClick={onLogout}></Button>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool
};

Header.defaultProps = {
  isAuthenticated: false
};

export default Header;
