import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BookShelfItem from '../smallComponents/BookShelfItem';
import { getCurrentProfile } from '../../redux/actions/profileActions';
import { volume_view } from '../../redux/actions/bookActions';

import Loader from '../utility/Loader';

import '../specificCSS/dashboard.css';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  selectVol = e => {
    this.props.volume_view(e.currentTarget.id);
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashBoardContent;
    console.log(profile);
    if (profile === null || loading) {
      dashBoardContent = <Loader />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashBoardContent = (
          <div className="dashboard-container">
            <div className="profile-details">
              <div className="profile-intro">
                <div className="profile-img">
                  <img src={user.avatar} alt={user.name} />
                </div>
                <div className="profile-quote">
                  <p>{profile.favouriteQuote}</p>
                </div>
              </div>

              <div className="profile-info">
                <div className="sub-section">
                  <div className="sub-section-title">Handle</div>
                  <div className="sub-section-detail">{profile.handle}</div>
                </div>

                <div className="sub-section">
                  <div className="sub-section-title">Favourite Genres</div>
                  <div className="sub-section-detail">
                    <ul>
                      {profile.favouriteCats ? (
                        profile.favouriteCats.map(item => {
                          return <li>{item}</li>;
                        })
                      ) : (
                        <li>Add Entry</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <Link className="btn edit-profile" to="/create-profile">
                {' '}
                Edit{' '}
              </Link>
            </div>
            <div className="profile-shelf">
              <div className="title shelf">
                <h4>Shelf</h4>
                <div className="shelf-container">
                  {profile.bookShelf ? (
                    profile.bookShelf.map(item => {
                      return (
                        // <Link to={`hub/browse/volume/${item.id}`}>
                        <BookShelfItem
                          link={`hub/browse/volume/${item.id}`}
                          key={item.id}
                          title={item.title}
                          status={item.status}
                          selectVol={this.selectVol}
                          id={item.id}
                          thumbnail={item.thumbnail}
                        />
                        /* <div
                            onClick={this.selectVol}
                            id={item.id}
                            className="shelf-item"
                          >
                            <img src={item.thumbnail} alt="" />
                          </div> */
                        // </Link>
                      );
                    })
                  ) : (
                    <div>Add Entry</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        //no profile exists
        dashBoardContent = (
          <div>
            <p>Welcome {user.name}</p>
            <p>You haven't set up your profile</p>
            <Link to="/create-profile" className="btn">
              {' '}
              Create Profile{' '}
            </Link>
          </div>
        );
      }
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
  volume_view
};
export default connect(
  mapState,
  mapDispatch
)(Dashboard);
