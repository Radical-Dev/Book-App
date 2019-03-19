import { INITIAL_REDUCER } from '../actionTypes';

const initialState = {};
const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_REDUCER:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default booksReducer;
