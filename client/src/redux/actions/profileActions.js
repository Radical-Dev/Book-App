import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, SAVE_PROFILE } from '../actionTypes';

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: []
      })
    );
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const saveProfileDetails = (profile, history) => dispatch => {
  axios.post('/api/profile', profile).then(res => {
    history.push('/profile');
  });
  // return {
  //   type: SAVE_PROFILE,
  //   payload: profile
  // };
};