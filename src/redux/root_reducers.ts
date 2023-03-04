import initReducer from './reducers/init_reducer';
import settingReducer from './reducers/setting_reducer';
import userReducer from './reducers/user_reducer';
import { combineReducers } from 'redux';

const rootReducers = combineReducers<IStateReducers>({
  initReducer,
  settingReducer,
  userReducer,
});

export default rootReducers;
