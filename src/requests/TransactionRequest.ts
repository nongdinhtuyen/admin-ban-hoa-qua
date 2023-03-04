import BaseRequest from './BaseRequest';

const schema = 'transaction';
/**
 * key base on host:port
 */
export default class TransactionRequest extends BaseRequest {
  /**
   *
   * @returns {Promise<BaseRequest._responseHandler.props.data|undefined>}
   */
  getTransactionHistory(params) {
    const url = `${schema}/history`;
    return this.get(url, params);
  }

  withdrawal(params) {
    const url = `${schema}/withdrawal`;
    return this.post(url, params);
  }

  withdrawalCustom(params) {
    const url = `${schema}/withdrawal-custom`;
    return this.post(url, params);
  }
}
