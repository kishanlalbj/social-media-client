import React from 'react';
import Button from '../Button';
import './header.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  const { user, onLogout } = props;

  return (
    <header>
      <div className="wrapper">
        <div>
          <h1>
            <NavLink to="/" className={'brand-text-link'}>
              Social Media
            </NavLink>
          </h1>
        </div>
        <div>
          {user ? (
            <>
              <NavLink to={`/profile/${user.user}`}>Profile</NavLink>
              <Button size="small" label="Logout" onClick={onLogout}></Button>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
