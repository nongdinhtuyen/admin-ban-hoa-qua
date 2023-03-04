import BaseRequest from './BaseRequest';

const schema = 'user';
/**
 * key base on host:port
 */
export default class UserRequest extends BaseRequest {
  /**
   *
   * @returns {Promise<BaseRequest._responseHandler.props.data|undefined>}
   */
  getUserBalance() {
    const url = `${schema}/balances`;
    return this.get(url);
  }

  transferCoin(params) {
    const url = `${schema}/transfer`;
    return this.post(url, params);
  }

  getListAddress() {
    const url = `${schema}/list-addresses`;
    return this.get(url);
  }

  getRecentAddress() {
    const url = `${schema}/recent-address`;
    return this.get(url);
  }

  delRecentAddress(params) {
    const url = `${schema}/recent-address?address=${params.address}&chain=${params.chain}`;
    return this.del(url, params);
  }
}
