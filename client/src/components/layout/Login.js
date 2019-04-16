import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    authenticated: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('d state00');
    if (nextProps.auth.authenticated === true) {
      return { authenticated: nextProps.auth.authenticated };
    } else return null;
  }

  componentDidUpdate() {
    if (this.state.authenticated === true) {
      this.props.history.push('/hub');
    }
  }

  updateitems = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  login = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(user);
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
          <h1>Login</h1>
        </div>
        <form action="">
          <div className="input-field col s6">
            <i className="fas fa-user-circle prefix" />
            <input
              onChange={this.updateitems}
              value={this.state.email}
              name="email"
              id="email"
              type="email"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s6">
            <i className="fas fa-key prefix" />
            <input
              onChange={this.updateitems}
              value={this.state.password}
              name="password"
              id="password"
              type="password"
            />
            <label htmlFor="password">Password</label>
          </div>
          <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
            onClick={this.login}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapState = state => ({
  auth: state.auth
});
const mapDispatch = {
  loginUser
};
export default connect(
  mapState,
  mapDispatch
)(Login);
