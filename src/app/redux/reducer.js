import { combineReducers } from 'redux';
import tagBrowser from './TagBrowser/reducer';
import tagDetail from './TagDetail/reducer';

export default combineReducers({
  tagBrowser,
  tagDetail
});
