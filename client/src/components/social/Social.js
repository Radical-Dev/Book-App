import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllProfiles, getCurrentProfile} from '../../redux/actions/profileActions';
import UserCard from './UserCard';
import Loader from '../utility/Loader';

import '../specificCSS/social.css';

class Social extends Component {
  componentDidMount() {
    this.props.getAllProfiles();
    this.props.getCurrentProfile("yes");
  }
loading= true;
  render() {
    let profiles = {};
    this.props.profile.profiles
      ? (profiles = this.props.profile.profiles)
      : (profiles = null);
      let friends ={};
      if(this.props.profile.profile != null && this.props.profile.profile.friends != null){
       (friends = this.props.profile.profile.friends)}
       else (friends = null);

       let friendDisplay;

       friends != null ? 
       friendDisplay = friends.map(friend => {
         if(typeof friend ==="object"){
           console.log(typeof friend);
          return (
            <UserCard
              id={friend._id}
              handle={friend.handle}
              avatar={friend.user.avatar}
              usrID={friend.user._id}
            />
          );}
          else return <div>Test 1 </div>;
        })
       : friendDisplay = <div>Test 2 </div>;


    return (
      <div className="container social">
        {this.props.profile.loading ? <Loader/> : 
        <Fragment>
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
                    new={true}
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
          <div className="new_people_list_items">
            {friendDisplay}
          </div>
        </div>
        </Fragment>
  }
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
  getAllProfiles,getCurrentProfile
};
export default connect(
  mapState,
  mapDispatch
)(Social);
