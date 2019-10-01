import {
  GET_PROFILE,
  PROFILE_LOADING,
  UPDATE_VOLUME_STATUS,
  GET_ALL_PROFILES,
  ADD_FRIEND
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
    case GET_ALL_PROFILES:
      return {
        ...state,
        profiles: action.payload
      };
    case UPDATE_VOLUME_STATUS:
      return {
        ...state,
        profile: action.payload
      };
    case ADD_FRIEND:
      return {
        ...state
      };
    default:
      return state;
  }
}
