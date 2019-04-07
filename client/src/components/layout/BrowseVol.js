import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class BrowseVol extends Component {
  state = {
    volume: {}
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.volume) {
      return { volume: nextProps.volume };
    } else return null;
  }

  render() {
    console.log(this.props.match);
    return (
      <Fragment>
        {this.state.volume.volumeInfo ? (
          <section className="hub-main volume">
            <div className="content">
              <div className="cover-initial-contain">
                <div className="book-cover">
                  <img
                    src={this.state.volume.volumeInfo.imageLinks.medium}
                    alt=""
                  />
                </div>
                <div className="book-initial-details">
                  <div className="detail">
                    Title{' '}
                    <span className="detail-info">
                      {this.state.volume.volumeInfo.title}
                    </span>
                  </div>
                  <div className="detail">
                    Year{' '}
                    <span className="detail-info">
                      {this.state.volume.volumeInfo.publishedDate}
                    </span>
                  </div>
                  <div className="detail">
                    Publisher{' '}
                    <span className="detail-info">
                      {this.state.volume.volumeInfo.publisher}
                    </span>
                  </div>
                </div>
              </div>
              <div className="additional-details">
                <div className="detail">
                  Author{' '}
                  <span className="detail-info">
                    {this.state.volume.volumeInfo.authors}
                  </span>
                </div>
                <div className="detail">
                  Description{' '}
                  <span className="detail-info">
                    {this.state.volume.volumeInfo.description}
                  </span>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="hub-main">
            <div className="loading">Loading</div>
          </section>
        )}
      </Fragment>
    );
  }
}
const mapState = state => {
  return {
    volume: state.books.volume
  };
};
export default connect(mapState)(BrowseVol);
