import {
  GET_PROFILE,
  PROFILE_LOADING,
  UPDATE_VOLUME_STATUS
} from '../actionTypes';

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case UPDATE_VOLUME_STATUS:
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
}
