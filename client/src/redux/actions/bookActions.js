import { CATEGORY_SEARCH, VIEW_VOLUME } from '../actionTypes';
import axios from 'axios';

export const category_search = cat => {
  return dispatch => {
    axios
      .get(`/api/books/browse/category/${cat}/0/10`)
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
