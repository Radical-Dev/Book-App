import React,{Fragment} from 'react'
import { Link } from 'react-router-dom';
import BookShelfItem from '../smallComponents/BookShelfItem';
export default function Profile(props) {
let dashBoardContent;
    if (Object.keys(props.profile).length > 0) {
        dashBoardContent = (
          <div className="dashboard-container">
            <div className="profile-details">
              <div className="profile-intro">
                <div className="profile-img">
                  <img src={props.user.avatar} alt={props.user.name} />
                </div>
                <div className="profile-quote">
                  <p>{props.profile.favouriteQuote}</p>
                </div>
              </div>

              <div className="profile-info">
                <div className="sub-section">
                  <div className="sub-section-title">Handle</div>
                  <div className="sub-section-detail">{props.profile.handle}</div>
                </div>

                <div className="sub-section">
                  <div className="sub-section-title">Favourite Genres</div>
                  <div className="sub-section-detail">
                    <ul>
                      {props.profile.favouriteCats ? (
                        props.profile.favouriteCats.map(item => {
                          return <li key={item.toString()}>{item}</li>;
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
                  {props.profile.bookShelf ? (
                    props.profile.bookShelf.map(item => {
                      return (
                        // <Link to={`hub/browse/volume/${item.id}`}>
                        <BookShelfItem
                          link={`hub/browse/volume/${item.id}`}
                          key={item.id}
                          title={item.title}
                          status={item.status}
                          selectVol={props.selectVol}
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
            <p>Welcome {props.user.name}</p>
            <p>You haven't set up your profile</p>
            <Link to="/create-profile" className="btn">
              {' '}
              Create Profile{' '}
            </Link>
          </div>
        );
      }
    



    return (
        <Fragment>
            {dashBoardContent}
        </Fragment>
    )
}
