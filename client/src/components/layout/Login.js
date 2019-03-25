import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  updateitems = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
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
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
