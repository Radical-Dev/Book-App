import { INITIAL_REDUCER, BOOK_SEARCH,BOOK_LOADING } from '../actionTypes';
import { CATEGORY_SEARCH, VIEW_VOLUME,CLEAN_BOOK_STATE } from '../actionTypes';

const initialState = { startIndex: 0, resultsPP: 10, items: [] ,category: null,page:0,loading:false};
const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_REDUCER:
      return {
        ...state
      };
      case BOOK_LOADING:
      return {
        ...state,
        loading: true
      };
    case CATEGORY_SEARCH:
      return {
        ...state,
        items: [...action.payload.data.data.items],
        category:action.payload.category,
        page:action.payload.page,
        loading:false
      };
      case BOOK_SEARCH:
        return {
          ...state,
          items: [...action.payload.data.data.items],
          page:action.payload.page,
          loading:false
        };
    case VIEW_VOLUME:
      return {
        ...state,
        volume: action.payload.volume.data
      };
      case CLEAN_BOOK_STATE:
        return {
          ...state,
          startIndex: 0, 
          resultsPP: 10, 
          items: [],
          category: null,
          page:0
        };
    default:
      return state;
  }
};

export default booksReducer;
