import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { volume_view } from '../../redux/actions/bookActions';

import '../specificCSS/booksDisplay.css';

class BooksDisplay extends Component {
  selectVol = e => {
    this.props.volume_view(e.currentTarget.id);
  };

  callback(item, path) {
    return (
      <React.Fragment key={item.id}>
        {/* <Link
          onClick={this.selectVol}
          id={item.id}
          to={`${this.path}/volume/${item.id}`}
        > */}
        <div onClick={this.selectVol} id={item.id} className="bookcard">
          <img alt="" src={item.volumeInfo.imageLinks.thumbnail} />
          <div className="bookcard-title">{item.volumeInfo.title}</div>
        </div>
        {/* </Link> */}
      </React.Fragment>
    );
  }
  render() {
    console.log('booksDisplay below');
    console.log(this.props.path);
    return (
      <div className="display-container">
        {this.props.items.map(item => {
          return (
            <Link to={`${this.props.path}/volume/${item.id}`}>
              <div onClick={this.selectVol} id={item.id} className="bookcard">
                <img alt="" src={item.volumeInfo.imageLinks.thumbnail} />
                <div className="bookcard-title">{item.volumeInfo.title}</div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}
const mapState = state => {
  return {
    items: [...state.books.items]
  };
};
export default connect(
  mapState,
  { volume_view }
)(BooksDisplay);
