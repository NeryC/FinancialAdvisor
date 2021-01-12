import React from 'react';
import { Link } from 'react-router-dom';

import HomeIcon from '../assets/png/home.png';

import '../styles/components/Header.css';

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img className="homeIcon" src={HomeIcon} alt="Home Icon" />
      </Link>
      <div className="title">Financial Advisor</div>
    </header>
  );
}

export default Header;
