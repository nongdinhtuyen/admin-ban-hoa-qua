import { IInitState } from '../redux/reducers/init_reducer';
import { ISettingState } from '../redux/reducers/setting_reducer';
import { IUserState } from 'redux/reducers/user_reducer';

declare global {
  interface IStateReducers {
    initReducer: IInitState;
    settingReducer: ISettingState;
    userReducer: IUserState;
  }
}
