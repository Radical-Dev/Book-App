import { INITIAL_REDUCER } from '../actionTypes';
import { CATEGORY_SEARCH, VIEW_VOLUME } from '../actionTypes';

const initialState = { startIndex: 0, resultsPP: 10, items: [] };
const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_REDUCER:
      return {
        ...state
      };
    case CATEGORY_SEARCH:
      return {
        ...state,
        items: [...action.payload.data.data.items]
      };
    case VIEW_VOLUME:
      return {
        ...state,
        volume: action.payload.volume.data
      };
    default:
      return state;
  }
};

export default booksReducer;
