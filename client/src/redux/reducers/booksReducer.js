import { INITIAL_REDUCER } from '../actionTypes';
import { CATEGORY_SEARCH, VIEW_VOLUME } from '../actionTypes';

const initialState = { startIndex: 0, resultsPP: 10, items: [] ,category: null,page:0};
const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_REDUCER:
      return {
        ...state
      };
    case CATEGORY_SEARCH:
      return {
        ...state,
        items: [...action.payload.data.data.items],
        category:action.payload.category,
        page:action.payload.page
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
