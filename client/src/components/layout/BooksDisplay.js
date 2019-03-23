import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../specificCSS/booksDisplay.css';

class BooksDisplay extends Component {
  render() {
    return (
      <div className="display-container">
        {this.props.items.map(item => {
          return (
            <React.Fragment>
              <div className="bookcard">
                <img alt="" src={item.volumeInfo.imageLinks.thumbnail} />
                <div className="bookcard-title">{item.volumeInfo.title}</div>
              </div>
            </React.Fragment>
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
export default connect(mapState)(BooksDisplay);
