// import { ADD_USER } from '../actionTypes';
import { ADD_REG_ERROR } from '../actionTypes';
import { ADD_LOG_ERROR } from '../actionTypes';
import { SET_CURRENT_USER } from '../actionTypes';

import setAuthToken from '../../utilities/setAuthToken';
import jwt_decode from 'jwt-decode';

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

export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      //save token to local storage
      const { token } = res.data;
      // set token
      localStorage.setItem('jwtToken', token);
      //set token to auth header
      setAuthToken(token);
      //decode token
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: ADD_LOG_ERROR,
        payload: { errors: err.response.data }
      })
    );
};

//set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};


//log out user
export const logoutUser = ()=> dispatch =>{
  //ewmove toekn from local storage
  localStorage.removeItem('jwtToken');
  //remove header
  setAuthToken(false);
  //set current user to {} which will set authenticated to false
  dispatch(setCurrentUser({}));
}