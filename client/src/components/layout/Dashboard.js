import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BookShelfItem from '../smallComponents/BookShelfItem';
import { getCurrentProfile, cleanProfileState, searchProfile } from '../../redux/actions/profileActions';
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
    console.log("test param", typeof this.props.match.params.profileID);
    let {profileID} = this.props.match.params; 
    !profileID ? this.props.getCurrentProfile()
    : this.props.searchProfile(profileID);
  }

  componentWillUnmount(){
    this.props.cleanProfileState();
  }

  selectVol = e => {
    this.props.volume_view(e.currentTarget.id);
  };

  render() {
    const { profile, loading } = this.props.profile;
    let user;
    profile ? user = profile.user : user ={};
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
  cleanProfileState,
  searchProfile
};
export default connect(
  mapState,
  mapDispatch
)(Dashboard);
