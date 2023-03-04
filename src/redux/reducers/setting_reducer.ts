import { createReducer } from '@reduxjs/toolkit';
import actions from 'redux/actions/setting_data';

import _ from 'lodash';

export interface ISettingState {
  coins: any;
  arrCoins: any;
  currencyMarkets: any;
  limitWithdrawals: any;
  mapCurrencyMarkets: any;
  coinSettings: any;
}

const initialState: ISettingState = {
  coins: [],
  arrCoins: {},
  limitWithdrawals: [],
  currencyMarkets: {},
  mapCurrencyMarkets: [],
  coinSettings: {},
};

const settingReducer = createReducer(initialState, (builder) => {
  builder.addCase(actions.actionGetLimitWithdrawalSuccess, (state, { payload }) => {
    return {
      ...state,
      limitWithdrawals: _.keyBy(payload, ({ currency: _currency, security_level }) => `${_currency}:${security_level}`),
    };
  });
  builder.addCase(actions.actionGetCoinSettingActionSucceed, (state, { payload }) => {
    return {
      ...state,
      coinSettings: payload,
    };
  });
  builder.addCase(actions.actionGetMarketSuccess, (state, { payload }) => {
    const newCurrencyMarkets = _.reduce(
      payload,
      (result: any, item, market) => {
        const [coin, currency] = `${market}`.split(':');

        if (_.isEmpty(result[currency])) {
          result[currency] = {};
        }
        result[currency][coin] = item;
        return result;
      },
      {}
    );
    return {
      ...state,
      currencyMarkets: newCurrencyMarkets,
    };
  });
  builder.addCase(actions.actionGetAllCoinSuccess, (state, { payload }) => {
    const coins = _.reduce(
      payload,
      (result, item, index) => {
        result[item.coin] = item;
        result[item.coin].key = index;
        return result;
      },
      {}
    );

    state.coins = coins;
    state.arrCoins = _.values(coins);
  });
});

export default settingReducer;
