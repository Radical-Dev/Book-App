import { ADD_USER } from '../actionTypes';
import { ADD_REG_ERROR, SET_CURRENT_USER, ADD_LOG_ERROR } from '../actionTypes';
import isEmpty from '../../utilities/is-empty';
const initialState = {
  authenticated: false,
  user: {},
  errors: { regErrors: null, logErrors: null }
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        user: action.payload.user
      };
    case ADD_REG_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          regErrors: action.payload.errors
        }
      };
    case ADD_LOG_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          logErrors: action.payload.errors
        }
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        authenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export default authReducer;
