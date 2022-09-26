import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="brand">Social Media</div>
        <div>
          <nav>
            <ul className="header-nav-list">
              <li>Login</li>
              <li>profile</li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
