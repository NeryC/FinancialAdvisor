import React from 'react';

import Header from './Header';

import '../styles/components/Layout.css';

function Layout({ children }) {
  return (
    <div className="Main">
      <Header />
      <div className="contentBox">{children}</div>
    </div>
  );
}

export default Layout;
