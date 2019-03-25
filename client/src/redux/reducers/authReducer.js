import { ADD_USER } from '../actionTypes';
import { ADD_REG_ERROR } from '../actionTypes';

const initialState = {
  authenticated: false,
  user: null,
  errors: { regErrors: null }
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
    default:
      return {
        ...state
      };
  }
};

export default authReducer;
