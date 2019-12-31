import React, { Component } from 'react'
import { connect } from 'react-redux';
import { category_search,setBookLoading } from '../../redux/actions/bookActions';
import { searchBooks } from '../../redux/actions/bookActions';
class Pagination extends Component {
    constructor(props) {
        super(props)
    
    this.paginateNext = this.paginateNext.bind(this);
    this.paginatePrev = this.paginatePrev.bind(this);
    }
    

    paginateNext= () =>{
        console.log('inside paginate next', this.props.type);
        if(this.props.type==="category"){
            this.props.setBookLoading();
            this.props.category_search(this.props.category,this.props.page+1);}
        else if(this.props.type==="search"){
            this.props.setBookLoading();
            console.log('inside paginate next search: ', this.props.term);
            this.props.searchBooks(this.props.term,this.props.page+1);
        }
      }
    
      paginatePrev= () =>{
        if(this.props.type==="category"){
            this.props.setBookLoading();
            this.props.category_search(this.props.category,this.props.page-1);}
        else if(this.props.type==="search"){
            this.props.setBookLoading();
            this.props.searchBooks(this.props.term,this.props.page-1);
        }
      }

    render() {
        return (
            <div className="cat-pagination"> {!this.props.page<1 ? <div onClick={this.paginatePrev} className="prev">Prev</div> :<div/> } <div onClick={this.paginateNext} className="next">Next</div> </div>
        )
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

  const mapDispacthToProps = {
    searchBooks,
    category_search,
    setBookLoading
  };
  export default connect(
    mapState,
    mapDispacthToProps
  )(Pagination);
