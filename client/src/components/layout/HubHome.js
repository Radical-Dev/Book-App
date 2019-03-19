import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import hubBrowse from '../../images/hub-browse.png';
import hubBg from '../../images/hub-bg.jpg';

export default class HubHome extends Component {
  render() {
    let hubBgStyle = {
      backgroundImage: `url(${hubBg})`
    };
    return (
      <section style={hubBgStyle} className="hub-main">
        <div className="heading">
          <h4>What are we doing Today?</h4>
        </div>
        <div className="hub-main-content">
          <div className="hub-main-content-icons">
            <Link to={`${this.props.match.url}/browse`}>
              <div className="browse iconTitleSet">
                <img className="icon" src={`${hubBrowse}`} alt="" />
                <div className="iconTitle">Browse Categories</div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    );
  }
}
