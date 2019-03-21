import React, { Component } from 'react';
import '../specificCSS/booksDisplay.css';

export default class BooksDisplay extends Component {
  componentsDisplay = this.props.items.map(item => {
    return (
      <div className="bookcard">
        <img alt="" src={item.volumeInfo.imageLinks.thumbnail} />
        <div className="bookcard-title">{item.volumeInfo.title}</div>
      </div>
    );
  });
  render() {
    return <div className="display-container">{this.componentsDisplay}</div>;
  }
}
