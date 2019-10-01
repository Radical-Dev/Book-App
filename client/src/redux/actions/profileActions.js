import axios from 'axios';

import {
  GET_PROFILE,
  PROFILE_LOADING,
  SAVE_PROFILE,
  UPDATE_VOLUME_STATUS,
  GET_ALL_PROFILES,
  ADD_FRIEND
} from '../actionTypes';

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

export const getAllProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then(res => {
      dispatch({
        type: GET_ALL_PROFILES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ALL_PROFILES,
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

// export const volume_status_update = (volTitle, status) => {
//   return {
//     type: UPDATE_VOLUME_STATUS
//   };
// };

export const volume_status_update = (volTitle, status) => {
  return dispatch => {
    axios
      .post(`/api/profile/book-shelf/book/update/status`, {
        title: volTitle,
        status
      })
      .then(res => {
        console.log(`coming from volume status action ${res.data}`);
        dispatch({
          type: UPDATE_VOLUME_STATUS,
          payload: res.data
        });
      })
      .catch(err => {
        console.log('error volume');
      });
    //dispatch({ type: UPDATE_VOLUME_STATUS });
  };
};

export const add_new_friend = friendID => dispatch => {
  axios
    .post('api/profile/add-friend', { friendID })
    .then(res => {
      console.log(`from add friend ${res.data}`);
      dispatch({
        type: ADD_FRIEND,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(`add friend error`);
    });
};

// export const volume_status_update = (volTitle, status) => dispatch => {
//   console.log(`coming from volume status action 1`);
//   axios
//     .post(`/api/books/book-shelf/book/update/status`, { volTitle, status })
//     .then(res => {
//       console.log(`coming from volume status action ${res}`);
//       dispatch({
//         type: UPDATE_VOLUME_STATUS,
//         payload: { profile: res }
//       });
//     })
//     .catch(err => {});
// };
