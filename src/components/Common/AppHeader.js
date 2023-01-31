import React from 'react';

import logo from 'assets/img/header_logo.png'
import profile from 'assets/img/gnb_user_fill.svg'
import "assets/css/header.css"

function AppHeader() {
  return (
    <nav>
      <div>
        <header>
          <a href="/">
            <img src={logo} alt="header-logo" />
          </a>
          <div className="header-common"></div>
          <div className="header-user">
            <img src={profile} alt="profile" className="header-common" />
            <span className="header-common">
              <b>정효상님</b>
            </span>
          </div>
        </header>
      </div>
      <img src="./assets/img/header_logo.png" alt="cv3_logo" />
    </nav>
  );
}

export default AppHeader;