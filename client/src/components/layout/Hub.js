import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import SideBar from './SideBar';
import HubHome from './HubHome';
import BrowseCat from './BrowseCat';
class Hub extends Component {
  render() {
    return (
      <div className="hub-container">
        {console.log(this.props.match)}
        <Route exact path={this.props.match.path} component={HubHome} />
        <Route
          exact
          path={`${this.props.match.path}/browse`}
          component={BrowseCat}
        />
        <SideBar />
      </div>
    );
  }
}

export default Hub;
