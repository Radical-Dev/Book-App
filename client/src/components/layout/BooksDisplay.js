import React, { Component,Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { volume_view } from '../../redux/actions/bookActions';


import '../specificCSS/booksDisplay.css';

class BooksDisplay extends Component {
  selectVol = e => {
    this.props.volume_view(e.currentTarget.id);
  };

  addVol = e => {
    e.preventDefault();
    let volID = e.currentTarget.nextSibling.firstChild.id;
    axios
      .get(`/api/books/browse/volume/${volID}`)
      .then(res => {
        let { volumeInfo } = res.data;
        const data = {
          title: volumeInfo.title,
          status: 'Reading',
          thumbnail: volumeInfo.imageLinks.thumbnail,
          id: volID
        };
        axios.post('/api/profile/book-shelf', data).then(res => {
          console.log(res.data);
        });
      })
      .catch(err => {});
    //console.log(e.currentTarget.nextSibling.firstChild.id);
  };

  render() {
    console.log('booksDisplay below');
    console.log(this.props.path);
    return (
      <div className="display-container">
        {this.props.items.map(item => {
          return (
            <Fragment>
            {item.volumeInfo.imageLinks ? 
              <div key={item.id} className="card-holder">
              <Link
                onClick={this.addVol}
                to="/"
                className="btn-floating waves-effect waves-light red"
              >
                <i className="fas fa-plus" />
              </Link>

              <Link to={`/hub/browse/volume/${item.id}`}>
                <div onClick={this.selectVol} id={item.id} className="bookcard">
                  <img alt="" src={item.volumeInfo.imageLinks.thumbnail} />
                  <div className="bookcard-title">{item.volumeInfo.title}</div>
                </div>
              </Link>
            </div>
              :<div key={item.id}/>
          }
          </Fragment>
            
          );
        })}
      </div>
    );
  }
}
const mapState = state => {
  return {
    items: [...state.books.items],
    
  };
};
export default connect(
  mapState,
  { volume_view }
)(BooksDisplay);
