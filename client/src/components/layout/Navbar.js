import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';

class Navbar extends Component {
  logOut = e => {
    this.props.logoutUser();
  };
  render() {
    const { authenticated, user } = this.props.auth;
    const authLinks = (
      <Fragment>
        <div className="main-nav-left-right-links">
          <ul>
            <li className="menu-items">Browse</li>
            <li className="menu-items">
              {' '}
              <Link to="/profile">Profile</Link>{' '}
            </li>
          </ul>
        </div>
        <div className="main-nav-logo">RBS</div>
        <div className="main-nav-left-right-links">
          <ul>
            <li className="menu-items"> Social Hub</li>
            <li className="menu-items"> Search </li>
            <li onClick={this.logOut} className="menu-items">
              <div className="logoutItem">
                <div id="menutext">Logout</div>
                <img className="prefix" src={user.avatar} alt="" />
              </div>
            </li>
          </ul>
        </div>
      </Fragment>
    );
    const guestLinks = (
      <Fragment>
        <div className="main-nav-left-right-links">
          <ul>
            <li className="menu-items">Browse</li>
            <li className="menu-items">
              {' '}
              <Link to="/profile">Profile</Link>
            </li>
            <li className="menu-items">
              {' '}
              <Link to="/register">Sign Up</Link>{' '}
            </li>
          </ul>
        </div>
        <div className="main-nav-logo">RBS</div>
        <div className="main-nav-left-right-links">
          <ul>
            <li className="menu-items"> Social Hub</li>
            <li className="menu-items"> Search </li>
            <li className="menu-items">
              {' '}
              <Link to="/login">Sign in</Link>
            </li>
          </ul>
        </div>
      </Fragment>
    );
    return (
      <nav className="main-nav">{authenticated ? authLinks : guestLinks}</nav>
    );
  }
}

const mapState = state => ({
  auth: state.auth
});
const mapDispatch = {
  logoutUser
};
export default connect(
  mapState,
  mapDispatch
)(Navbar);
