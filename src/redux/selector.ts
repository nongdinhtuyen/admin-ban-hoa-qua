import { createSelector } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';

import _ from 'lodash';

const selectCurrencyMarkets = (state: any) => state.settingReducer.currencyMarkets;
const selectCoinSettings = (state: any) => state.settingReducer.coinSettings;
const selectUserBalance = (state: any) => state.userReducer.userBalance;

export const getTotalUSDTBalance = createSelector(
  selectCurrencyMarkets,
  selectCoinSettings,
  selectUserBalance,
  (currencyMarkets, coinSettings, userBalance) => {
    let sumBalance = new BigNumber(0);

    const mapCoinSettings = _.keyBy(coinSettings, 'coin');
    _.forEach(userBalance, (item) => {
      const currencyMarketUSDT = _.get(currencyMarkets, ['USDT', `${item['coin']}`], false);
      const { currency } = _.get(mapCoinSettings, [item['coin']], { currency: '' });
      const currencyMarketCoin = _.get(currencyMarkets, [currency, `${item['coin']}`], false);
      if (currencyMarketUSDT) {
        if (item.available_balance !== '0') {
          sumBalance = sumBalance.plus(new BigNumber(item.available_balance).times(currencyMarketUSDT.last_price));
        }
        if (!_.isEmpty(item.lock_balance) && item.lock_balance !== '0') {
          sumBalance = sumBalance.plus(new BigNumber(item.lock_balance).times(currencyMarketUSDT.last_price));
        }
      } else if (currencyMarketCoin) {
        if (item.available_balance !== '0') {
          sumBalance = sumBalance.plus(
            new BigNumber(item.available_balance).times(currencyMarketCoin.last_price).times(_.get(currencyMarkets, `USDT.${currency}.last_price`, 1))
          );
        }
        if (!_.isEmpty(item.lock_balance) && item.lock_balance !== '0') {
          sumBalance = sumBalance.plus(
            new BigNumber(item.lock_balance).times(currencyMarketCoin.last_price).times(_.get(currencyMarkets, `USDT.${currency}.last_price`, 1))
          );
        }
      } else {
        sumBalance = sumBalance.plus(item.available_balance);
      }
    });

    return sumBalance.toNumber();
  }
);

export const getTotalBTCBalance = createSelector(selectCurrencyMarkets, getTotalUSDTBalance, (currencyMarkets, totalUSDTBalance) => {
  const currencyMarketBTC = _.get(currencyMarkets, ['USDT', 'BTC', 'last_price'], 0);
  return new BigNumber(currencyMarketBTC).isGreaterThan(0) ? new BigNumber(totalUSDTBalance).div(currencyMarketBTC).toNumber() : 0;
});
