import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav className="main-nav">
        <div className="main-nav-left-right-links">
          <li className="menu-items">Browse</li>
          <li className="menu-items"> Profile</li>
        </div>
        <div className="main-nav-logo">RBS</div>
        <div className="main-nav-left-right-links">
          <li className="menu-items"> Social Hub</li>
          <li className="menu-items"> Search </li>
        </div>
      </nav>
    );
  }
}

export default Navbar;
