import React, { Component } from 'react';
import '../specificCSS/shelfItem.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { volume_status_update } from '../../redux/actions/profileActions';

class BookShelfItem extends Component {
  constructor(props) {
    super(props);

    this.readClick = this.readClick.bind(this);
  }

  readClick = e => {
    this.props.volume_status_update(this.props.title, 'Read');
  };

  readingClick = e => {
    this.props.volume_status_update(this.props.title, 'Reading');
  };

  pendingClick = e => {
    this.props.volume_status_update(this.props.title, 'Pending');
  };
  render() {
    return (
      <div className="shelf-item-container card">
        <Link to={this.props.link}>
          <div
            onClick={this.props.selectVol}
            id={this.props.id}
            className="shelf-item"
          >
            <img src={this.props.thumbnail} alt="" />
          </div>
        </Link>
        <div className="shelf-overlay">
          <ul className="shelf-overlay-list">
            <li onClick={this.readClick}>
              <span
                className={`overlay-list-btn ${
                  this.props.status === 'Read' ? 'active' : 'reg'
                }`}
              >
                <i className="fas fa-check-circle overlay-list-btn" />
              </span>
            </li>
            <li onClick={this.readingClick}>
              <span
                className={`overlay-list-btn ${
                  this.props.status === 'Reading' ? 'active' : 'reg'
                }`}
              >
                <i className="fas fa-eye overlay-list-btn" />
              </span>
            </li>

            <li onClick={this.pendingClick}>
              <span
                className={`overlay-list-btn ${
                  this.props.status === 'Pending' ? 'active' : 'reg'
                }`}
              >
                <i className="fas fa-hourglass overlay-list-btn" />
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
const mapDispatch = {
  volume_status_update
};
export default connect(
  null,
  mapDispatch
)(BookShelfItem);
