import { DELETE_RECENT_ADDRESS, GET_LIST_ADDRESS, GET_RECENT_ADDRESS, GET_USER_BALANCE, TRANSFER_COIN } from './action_types';
import { createAction } from '@reduxjs/toolkit';

export default {
  actionGetUserBalance: createAction<ActionPayloadStandard>(GET_USER_BALANCE),
  actionTransfer: createAction<ActionPayloadStandard>(TRANSFER_COIN),
  actionGetListAddress: createAction<ActionPayloadStandard>(GET_LIST_ADDRESS),
  actionGetRecentAddress: createAction<ActionPayloadStandard>(GET_RECENT_ADDRESS),
  actionDelRecentAddress: createAction<ActionPayloadStandard>(DELETE_RECENT_ADDRESS),
};
