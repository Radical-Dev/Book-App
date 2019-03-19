import React, { Component } from 'react';

class BrowseCat extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.switchCategory = this.switchCategory.bind(this);
  }
  categories = [
    'Thriller',
    'Drama',
    'Mystery',
    'Romance',
    'Fantasy',
    'Adventure'
  ];
  switchCategory = e => {
    console.log(e.target.value);
  };

  displayCategories = this.categories.map(ele => {
    console.log(ele);
    return (
      <li onClick={this.switchCategory} value={ele} className="category">
        {ele}
      </li>
    );
  });

  render() {
    return (
      <section className="hub-main browse-cat">
        <div className="heading">
          <h4 onClick={this.switchCategory}>Browse Categories</h4>
        </div>
        <ul className="categories-section">{this.displayCategories}</ul>
      </section>
    );
  }
}

export default BrowseCat;
