import { GET_TRANSACTION_HISTORY, WITHDRAW, WITHDRAW_CUSTOM } from './action_types';
import { createAction } from '@reduxjs/toolkit';

export default {
  actionGetTransactionHistoy: createAction<ActionPayloadStandard>(GET_TRANSACTION_HISTORY),
  actionWithdrawCustom: createAction<ActionPayloadStandard>(WITHDRAW_CUSTOM),
  actionWithdraw: createAction<ActionPayloadStandard>(WITHDRAW),
};
