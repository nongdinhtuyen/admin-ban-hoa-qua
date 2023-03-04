import utils from '../../common/utils';
import rf from '../../requests/RequestFactory';
import { unfoldSaga } from '../redux_helper';
import axios from 'axios';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { DELETE_RECENT_ADDRESS, GET_LIST_ADDRESS, GET_RECENT_ADDRESS, GET_USER_BALANCE, TRANSFER_COIN } from 'redux/actions/user/action_types';

function* getUserBalance(action: ActionSagas) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('UserRequest').getUserBalance(params), params);
        return data;
      },
      key: GET_USER_BALANCE,
    },
    callbacks
  );
}

function* transferCoin(action: ActionSagas) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('UserRequest').transferCoin(params), params);
        return data;
      },
      key: TRANSFER_COIN,
    },
    callbacks
  );
}

function* getListAddress(action: ActionSagas) {
  const { callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call(() => rf.getRequest('UserRequest').getListAddress());
        return data;
      },
      key: GET_LIST_ADDRESS,
    },
    callbacks
  );
}

function* getRecentAddress(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('UserRequest').getRecentAddress(params), params);
        return data;
      },
      key: GET_RECENT_ADDRESS,
    },
    callbacks
  );
}

function* delRecentAddress(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('UserRequest').delRecentAddress(params), params);
        return data;
      },
      key: DELETE_RECENT_ADDRESS,
    },
    callbacks
  );
}

function* watchInit() {
  yield takeLatest(GET_USER_BALANCE, getUserBalance);
  yield takeLatest(TRANSFER_COIN, transferCoin);
  yield takeLatest(GET_LIST_ADDRESS, getListAddress);
  yield takeLatest(GET_RECENT_ADDRESS, getRecentAddress);
  yield takeLatest(DELETE_RECENT_ADDRESS, delRecentAddress);
}

export default function* rootSaga() {
  yield all([fork(watchInit)]);
}
