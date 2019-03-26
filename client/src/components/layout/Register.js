import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { add_user } from '../../redux/actions/authActions';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    cpassword: ''
  };

  updateitems = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitUser = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.cpassword
    };

    this.props.add_user(newUser, this.props.history);
  };

  authenticated = this.props.auth.authenticated;

  componentDidMount() {
    if (this.authenticated) {
      this.props.history.push('/hub');
    }
  }

  render() {
    return (
      <div className="authContainer">
        <div className="title">
          <h1>Sign-Up</h1>
        </div>
        <form action="" method="post">
          <label htmlFor="username">Enter Username: </label>
          <input
            onChange={this.updateitems}
            value={this.state.name}
            type="text"
            name="username"
          />

          <label htmlFor="email">Enter Email: </label>
          <input
            onChange={this.updateitems}
            value={this.state.email}
            type="email"
            name="email"
          />

          <label htmlFor="password">Choose password: </label>
          <input
            onChange={this.updateitems}
            value={this.state.password}
            type="password"
            name="password"
          />

          <label htmlFor="cpassword">Confirm password: </label>
          <input
            onChange={this.updateitems}
            value={this.state.cpassword}
            type="password"
            name="cpassword"
          />

          <input onClick={this.submitUser} type="submit" value="Register" />
        </form>
      </div>
    );
  }
}
const mapState = state => ({
  auth: state.auth
});
const mapDispatch = {
  add_user
};

export default connect(
  mapState,
  mapDispatch
)(withRouter(Register));
