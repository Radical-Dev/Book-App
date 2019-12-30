import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux';
import { category_search } from '../../redux/actions/bookActions';
import BooksDisplay from './BooksDisplay';
import hubBg from '../../images/hub-bg.jpg';
class BrowseCat extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.switchCategory = this.switchCategory.bind(this);
    this.paginateNext = this.paginateNext.bind(this);
    this.paginatePrev = this.paginatePrev.bind(this);
  }
  categories = [
    'Thriller',
    'Drama',
    'Mystery',
    'Romance',
    'Fantasy',
    'Adventure'
  ];

  paginateNext= () =>{
    this.props.category_search(this.props.category,this.props.page+1);
  }

  paginatePrev= () =>{
    this.props.category_search(this.props.category,this.props.page-1);
  }

  switchCategory = e => {
    const viewCategory = e.target.textContent;
    this.props.category_search(viewCategory);
  };

  displayCategories = this.categories.map(ele => {
    console.log(`${this.props.match}`);
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
          <h4>Select Category above.</h4>
        ) : (
          <Fragment>
          <BooksDisplay path={this.props.match.path} />
          <div className="cat-pagination"> {!this.props.page<1 ? <div onClick={this.paginatePrev} className="prev">Prev</div> :<div/> } <div onClick={this.paginateNext} className="next">Next</div> </div>
          </Fragment>
        )}
      </section>
    );
  }
}
const mapState = state => {

  return {
    items: state.books.items,
    page: state.books.page,
    resultsPP:state.books.resultsPP,
    category:state.books.category
  };
};
const mapDispactToProps = {
  category_search
};
export default connect(
  mapState,
  mapDispactToProps
)(BrowseCat);
