import { combineReducers } from 'redux';
//import authReducer from './authReducer';
import booksReducer from './booksReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
export default combineReducers({
  books: booksReducer,
  auth: authReducer,
  profile: profileReducer
});
