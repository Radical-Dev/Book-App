import React, { Component } from 'react';
import { connect } from 'react-redux';
import { category_search } from '../../redux/actions/bookActions';
import BooksDisplay from './BooksDisplay';
import hubBg from '../../images/hub-bg.jpg';
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
    const viewCategory = e.target.textContent;
    this.props.category_search(viewCategory);
  };

  displayCategories = this.categories.map(ele => {
    console.log(ele);
    return (
      <li onClick={this.switchCategory} key={ele} className="category">
        {ele}
      </li>
    );
  });

  render() {
    let hubBgStyle = {
      backgroundImage: `url(${hubBg})`
    };
    return (
      <section style={hubBgStyle} className="hub-main browse-cat">
        <div className="heading">
          <h4 onClick={this.switchCategory}>Browse Categories</h4>
        </div>
        <div className="container">
          <ul className="categories-section">{this.displayCategories}</ul>
        </div>
        {!this.props.items.length ? (
          <h4>What do you wanna see</h4>
        ) : (
          <BooksDisplay />
        )}
      </section>
    );
  }
}
const mapState = state => {
  const { startIndex } = state;
  const { resultsPP } = state;

  return {
    items: state.books.items,
    startIndex,
    resultsPP
  };
};
const mapDispactToProps = {
  category_search
};
export default connect(
  mapState,
  mapDispactToProps
)(BrowseCat);
