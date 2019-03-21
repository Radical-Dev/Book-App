import { CATEGORY_SEARCH } from '../actionTypes';
import axios from 'axios';

export const category_search = cat => {
  return dispatch => {
    axios
      .get(`http://localhost:5000/api/books/browse/category/${cat}/0/10`)
      .then(response => {
        dispatch(category_search_sync(response));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const category_search_sync = data => {
  return {
    type: CATEGORY_SEARCH,
    payload: {
      data
    }
  };
};
