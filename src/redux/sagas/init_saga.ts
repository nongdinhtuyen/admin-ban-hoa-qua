// import userActions from '../actions/user';
import rf from '../../requests/RequestFactory';
import actions from '../actions/setting_data';
import axios from 'axios';
import BigNumber from 'bignumber.js';
import utils from 'common/utils';
// import utils from '../../common/utils';
// import favoritesActions from '../actions/favorites';
// import P2PActions from '../actions/p2p';
import consts from 'constants/consts';
import dayjs from 'dayjs';
import qs from 'qs';
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import initActions from 'redux/actions/init';
import userActions from 'redux/actions/user';

import _ from 'lodash';

function* fetchAuthIfNeed() {
  console.log('=== fetchAuthIfNeed ===');
  const session = utils.getSessionJSON();
  // check token expired
  if (!_.isEmpty(session) && dayjs().isBefore(new BigNumber(session.time_expired).div(1000).toNumber())) {
    console.log('=== OK ===');
    const { token } = session;
    // add token for axios
    window.axios.defaults.headers['token'] = token;
    yield put(userActions.actionGetUserBalance({}));
    yield put(userActions.actionGetListAddress({}));
  }
}

function* saveMasterData() {
  console.log('=== saveMasterData ===');
  const masterData = JSON.parse(localStorage.getItem('CRYPTO') || '{}');
  yield put(actions.actionGetAllCoinSuccess(masterData.coins));
  const { data } = yield call(() => rf.getRequest('SettingRequest').getMarket());
  yield put(actions.actionGetMarketSuccess(data));
  yield put(actions.actionGetCoinSettingActionSucceed(masterData.settings));
  yield put(actions.actionGetLimitWithdrawalSuccess(masterData.withdrawal_limits));
  // yield put(actions.fetchAffilateActionSucceed(masterData.affilate));
  // yield put(P2PActions.fetchP2pCoinSucceed(masterData.p2p_coin));
  // yield put(P2PActions.fetchFiatActionSucceed(masterData.fiat));
  // yield put(P2PActions.fetchP2pPaymentMethodSucceed(masterData.p2p_payment_method));
}

function* fetchSettingIfNeed() {
  try {
    if (!localStorage.getItem('CRYPTO')) {
      const { data, hash } = yield call(() => rf.getRequest('SettingRequest').fetchCryptoSetting());
      yield localStorage.setItem('CRYPTO', JSON.stringify(data));
      yield localStorage.setItem('CRYPTO_HASH', hash);

      yield saveMasterData();
      return;
    }
    if (localStorage.getItem('CRYPTO_HASH')) {
      console.log('=== 1 ===');
      const crypto_hash = yield call(() => rf.getRequest('SettingRequest').fetchSettingHash());

      console.log('=== 2 ===');
      const hash = localStorage.getItem('CRYPTO_HASH');
      if (hash === crypto_hash.data) {
        yield saveMasterData();
        return;
      }
    }

    const { data, hash } = yield call(() => rf.getRequest('SettingRequest').fetchCryptoSetting());
    yield localStorage.setItem('CRYPTO', JSON.stringify(data));
    yield localStorage.setItem('CRYPTO_HASH', hash);

    yield saveMasterData();
  } catch (err) {
    console.log(err);
  }
}

function* fetchInit() {
  try {
    // yield put(actions.fetchHashSetting());
    yield fetchAuthIfNeed();
    yield fetchSettingIfNeed();
    yield put(initActions.actionInitSucceed());
  } catch (err) {
    // localStorage.removeItem(consts.SESSION);
    console.log(err, 'err');
  }
}

function* watchInit() {
  yield takeLatest('@@__INIT__', fetchInit);
  // yield takeLatest(GET_AUTH_IF_NEED, fetchAuthIfNeed);
}

export default function* rootSaga() {
  yield all([fork(watchInit)]);
}
