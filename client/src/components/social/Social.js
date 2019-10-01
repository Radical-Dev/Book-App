import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../redux/actions/profileActions';
import UserCard from './UserCard';

import '../specificCSS/social.css';

class Social extends Component {
  componentDidMount() {
    this.props.getAllProfiles();
  }

  render() {
    let profiles = {};
    this.props.profile.profiles
      ? (profiles = this.props.profile.profiles)
      : (profiles = null);
    return (
      <div className="container social">
        <div className="new_people_list friend-list">
          <div className="title green-text-custom">
            Discover new Reading buddies!
          </div>
          <div className="new_people_list_items">
            {profiles ? (
              profiles.map(profile => {
                return (
                  <UserCard
                    id={profile._id}
                    handle={profile.handle}
                    avatar={profile.user.avatar}
                  />
                );
              })
            ) : (
              <div />
            )}
          </div>
        </div>

        <div className="old-friends friend-list">
          <div className="title green-text-custom">Existing friends</div>
        </div>
      </div>
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
  getAllProfiles
};
export default connect(
  mapState,
  mapDispatch
)(Social);
