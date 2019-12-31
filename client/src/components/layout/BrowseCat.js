import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux';
import { category_search,setBookLoading,cleanBookState } from '../../redux/actions/bookActions';
import BooksDisplay from './BooksDisplay';
import hubBg from '../../images/hub-bg.jpg';
import Loader from '../utility/Loader';
import Pagination from '../smallComponents/Pagination';

class BrowseCat extends Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.switchCategory = this.switchCategory.bind(this);
  }

  componentWillUnmount(){
    this.props.cleanBookState();
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
    this.props.setBookLoading();
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
            {this.props.loading ? <Loader/> :
            <Fragment>
              <BooksDisplay path={this.props.match.path} />
              <Pagination type={"category"}/>
            </Fragment>
        }
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
    category:state.books.category,
    loading: state.books.loading
  };
};
const mapDispactToProps = {
  category_search,setBookLoading,cleanBookState
};
export default connect(
  mapState,
  mapDispactToProps
)(BrowseCat);
