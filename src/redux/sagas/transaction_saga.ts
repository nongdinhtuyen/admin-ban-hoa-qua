import rf from '../../requests/RequestFactory';
import { unfoldSaga } from '../redux_helper';
import { all, call, fork, takeLatest } from 'redux-saga/effects';
import { GET_TRANSACTION_HISTORY, WITHDRAW, WITHDRAW_CUSTOM } from 'redux/actions/transaction/action_types';

function* getTransactionHistory(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('TransactionRequest').getTransactionHistory(params), params);
        return data;
      },
      key: GET_TRANSACTION_HISTORY,
    },
    callbacks
  );
}

function* withdrawCustom(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('TransactionRequest').withdrawalCustom(params), params);
        return data;
      },
      key: WITHDRAW_CUSTOM,
    },
    callbacks
  );
}

function* withdraw(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('TransactionRequest').withdrawal(params), params);
        return data;
      },
      key: WITHDRAW,
    },
    callbacks
  );
}

function* watchInit() {
  yield takeLatest(GET_TRANSACTION_HISTORY, getTransactionHistory);
  yield takeLatest(WITHDRAW, withdraw);
  yield takeLatest(WITHDRAW_CUSTOM, withdrawCustom);
}

export default function* rootSaga() {
  yield all([fork(watchInit)]);
}
