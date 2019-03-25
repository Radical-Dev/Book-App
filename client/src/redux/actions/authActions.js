// import { ADD_USER } from '../actionTypes';
import { ADD_REG_ERROR } from '../actionTypes';
import axios from 'axios';

export const add_user = (data, history) => {
  return dispatch => {
    axios
      .post('/api/users/register', data)
      .then(res => history.push('/login'))
      .catch(err => {
        dispatch({
          type: ADD_REG_ERROR,
          payload: { errors: err.response.data }
        });
      });
  };
};
