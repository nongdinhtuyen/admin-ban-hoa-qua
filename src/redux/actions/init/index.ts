import { INIT_SUCCEED } from './action_types';
import { createAction } from '@reduxjs/toolkit';

export default {
  actionInitSucceed: createAction(INIT_SUCCEED),
};
