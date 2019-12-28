import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BookShelfItem from '../smallComponents/BookShelfItem';
import { getCurrentProfile, cleanProfileState } from '../../redux/actions/profileActions';
import { volume_view } from '../../redux/actions/bookActions';
import Profile from '../Profile/Profile';

import Loader from '../utility/Loader';

import '../specificCSS/dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props)
  
    this.selectVol = this.selectVol.bind(this);
  }
  
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillUnmount(){
    this.props.cleanProfileState();
  }

  selectVol = e => {
    this.props.volume_view(e.currentTarget.id);
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashBoardContent;
    console.log(profile);
    if (profile === null || loading) {
      dashBoardContent = <Loader />;
    } else {
      dashBoardContent = <Profile user={user} profile={profile} selectVol={this.selectVol}/>
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
  getCurrentProfile,
  volume_view,
  cleanProfileState
};
export default connect(
  mapState,
  mapDispatch
)(Dashboard);
