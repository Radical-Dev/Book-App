import React, { Component, Fragment } from 'react'
import hubBg from '../../images/hub-bg.jpg';
import BooksDisplay from './BooksDisplay';
import { connect } from 'react-redux';
import { searchBooks,setBookLoading,cleanBookState } from '../../redux/actions/bookActions';
import Pagination from '../smallComponents/Pagination';
import Loader from '../utility/Loader';

class SearchBooks extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             term:''
        }
        this.updateitems = this.updateitems.bind(this);
        this.searchBooks = this.searchBooks.bind(this);
    }

    componentWillUnmount(){
        this.props.cleanBookState();
      }

    updateitems = e => {
        //console.log(e.target.value);
        this.setState({ [e.target.id]: e.target.value });
      };

    searchBooks = e => {
        e.preventDefault();
        this.props.setBookLoading();
        this.props.searchBooks(this.state.term);
      };

    render() {
        let hubBgStyle = {
            backgroundImage: `url(${hubBg})`
          };
        return (
            <section style={hubBgStyle} className="hub-main browse-cat">
                <h3>Search</h3>

                <div className="input-field col s6">
                    <input
                        onChange={this.updateitems}
                        value={this.state.term}
                        name="term"
                        id="term"
                        type="text"
                    />
                    <label className="active" htmlFor="term">
                        Search Term
                    </label>
                </div>
                <button
                    className="btn waves-effect waves-light"
                    id="search-btn"
                    type="submit"
                    name="action"
                    onClick={this.searchBooks}
                >
                Search
                </button>

                {!this.props.items.length ? (
                    <h4>Enter Search term above.</h4>
                    ) : (
                    <Fragment>
                        {this.props.loading? <Loader/> :
                        <Fragment> 
                            <BooksDisplay path={this.props.match.path} />
                            <Pagination type={"search"} term={this.state.term}/>
                        </Fragment>
                        }
                    </Fragment>
                )}
            </section>
        )
    }
}

const mapState = state => {
    return {
      items: state.books.items,
      page: state.books.page,
    resultsPP:state.books.resultsPP,
    loading:state.books.loading
    };
  };

  const mapDispactToProps = {
    searchBooks,setBookLoading,cleanBookState
  };
  export default connect(
    mapState,
    mapDispactToProps
  )(SearchBooks);