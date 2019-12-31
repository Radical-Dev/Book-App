import { CATEGORY_SEARCH, VIEW_VOLUME,BOOK_SEARCH,BOOK_LOADING,CLEAN_BOOK_STATE } from '../actionTypes';
import axios from 'axios';

export const category_search = (cat,page=0,perPage=10) => {
  let strtIndex = page*perPage;
  return dispatch => {
    axios
      .get(`/api/books/browse/category/${cat}/${strtIndex}/${perPage}`)
      .then(response => {
        dispatch(category_search_sync(response,cat,page));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const category_search_sync = (data,cat,page) => {
  return {
    type: CATEGORY_SEARCH,
    payload: {
      data,
      category:cat,
      page
    }
  };
};

export const cleanBookState = () => {
  return {
    type: CLEAN_BOOK_STATE
  };
};

export const volume_view = volId => {
  return dispatch => {
    axios
      .get(`/api/books/browse/volume/${volId}`)
      .then(res => {
        dispatch({
          type: VIEW_VOLUME,
          payload: { volume: res }
        });
      })
      .catch(err => {});
  };
};

export const setBookLoading = () => {
  return {
    type: BOOK_LOADING
  };
};

export const searchBooks = (searchTerm,page=0,perPage=10) => {
  let strtIndex = page*perPage;
  let newTerm = encodeURIComponent(searchTerm);
  console.log("new term: ", newTerm);
  console.log("index: ", page);
  return dispatch => {
    axios
      .get(`/api/books/browse/search/${newTerm}/${strtIndex}/${perPage}`)
      .then(res => {
        console.log(res.data.items);
        dispatch({
          type: BOOK_SEARCH,
          payload: { data:res,page }
        });
      })
      .catch(err => {});
  };
};
