import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { add_new_friend } from '../../redux/actions/profileActions';

class UserCard extends Component {
  senduser = friendId => {
    console.log(this.props.id);
    this.props.add_new_friend(this.props.id);
  };
  render() {
    return (
      <div className="user-card">
        <div className="user-card-img">
          <img src={this.props.avatar} alt={this.props.handle} />
        </div>
        <div className="user-card-name green-text-custom">
          {this.props.handle}
        </div>
        <div className="user-card-icons">
          {this.props.new ? <div onClick={this.senduser} className="add-friend-icon fc-icon">
            <i className="fas fa-user-plus" />
          </div>
          :<div/>
          }
          <div className="view-friend-icon fc-icon">
            {' '}
            <Link to ={`/profile/${this.props.usrID}`}>
            <i className="fas fa-binoculars" />
            </Link>
            {' '}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = { add_new_friend };

export default connect(
  null,
  mapDispatch
)(UserCard);
