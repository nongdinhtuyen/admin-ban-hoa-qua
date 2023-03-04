import { GET_ALL_COIN_SUCCEED, GET_COIN_SETTING_SUCCEED, GET_LIMIT_WITHDRAWAL_SUCCEED, GET_MARKET_SUCCEED } from './action_types';
import { createAction } from '@reduxjs/toolkit';

export default {
  actionGetAllCoinSuccess: createAction<ActionPayloadRedux>(GET_ALL_COIN_SUCCEED),
  actionGetLimitWithdrawalSuccess: createAction<ActionPayloadRedux>(GET_LIMIT_WITHDRAWAL_SUCCEED),
  actionGetMarketSuccess: createAction<ActionPayloadRedux>(GET_MARKET_SUCCEED),
  actionGetCoinSettingActionSucceed: createAction<ActionPayloadRedux>(GET_COIN_SETTING_SUCCEED),
};
