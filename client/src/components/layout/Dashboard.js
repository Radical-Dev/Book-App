import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../redux/actions/profileActions';
import Loader from '../utility/Loader';

import '../specificCSS/dashboard.css';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashBoardContent;
    console.log(profile);
    if (profile === null || loading) {
      dashBoardContent = <Loader />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashBoardContent = (
          <div className="dashboard-container">
            <div className="profile-details">
              <div className="profile-intro">
                <div className="profile-img">
                  <img src={user.avatar} alt={user.name} />
                </div>
                <div className="profile-quote">
                  <p>{profile.quote}</p>
                </div>
              </div>
            </div>
            <div className="profile-shelf">
              <div className="title shelf">
                <h4>Shelf</h4>
              </div>
            </div>
          </div>
        );
      } else {
        //no profile exists
        dashBoardContent = (
          <div>
            <p>Welcome {user.name}</p>
            <p>You haven't set up your profile</p>
            <Link to="/create-profile" className="btn">
              {' '}
              Create Profile{' '}
            </Link>
          </div>
        );
      }
    }
    return (
      <section className="dashboard">
        <Fragment>{dashBoardContent}</Fragment>
      </section>
    );
  }
}
const mapState = state => {
  return {
    profile: state.profile,
    auth: state.auth
  };
};

const mapDispatch = {
  getCurrentProfile
};
export default connect(
  mapState,
  mapDispatch
)(Dashboard);
