import { createReducer } from '@reduxjs/toolkit';
import actions from 'redux/actions/user';
import { createActionTypeOnSuccess } from 'redux/redux_helper';

import _ from 'lodash';

export interface IUserState {
  userBalance: {
    id: number;
    pubkey: string;
    coin: string;
    balance: string;
    available_balance: string;
    blockchain_address: string;
    created_at: number;
    updated_at: number;
    decimal: number;
    isLock: false;
    lockTo: number;
    map_address: object;
    lock_balance: string;
    pending_balance: string;
  }[];
  listAddress: any[];
  mapUserBalance: any;
  info: any;
}

const initialState: IUserState = {
  userBalance: [],
  mapUserBalance: {},
  info: {},
  listAddress: [],
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(createActionTypeOnSuccess(actions.actionGetUserBalance), (state, { payload }: any) => {
    state.userBalance = payload.data;
    state.mapUserBalance = _.keyBy(payload.data, 'coin');
    state.info = {
      uid: 17978,
      pubkey: '029793f1eb45ab4ba917fc118b89a74bf0256c7ffba889d279699759cdf4d5a14d',
      email: '',
      google_authentication: '',
      avatar: '',
      phone: '',
      accept_term: true,
      status: '',
      account_note: '',
      last_login: 0,
      is_banned: false,
      is_block_trans: false,
      is_block_order: false,
      registration_date: 1640059134,
      display_name: '',
      locale: '',
      security_level: 1,
      created_at: 1640059134,
      updated_at: 1640059134,
      dob: 0,
      gender: 0,
      referral_code: 'kXyyEqLm',
      rootkey: '',
      count: 0,
      added_at: 0,
      iht: false,
      b: false,
      is_special_user: false,
      map_ext: null,
    };
  });
  builder.addCase(createActionTypeOnSuccess(actions.actionGetListAddress), (state, { payload }: any) => {
    state.listAddress = payload.data;
  });
});

export default userReducer;
