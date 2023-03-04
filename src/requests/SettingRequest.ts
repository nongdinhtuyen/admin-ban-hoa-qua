import BaseRequest from './BaseRequest';

const schema = 'setting';
/**
 * key base on host:port
 */
export default class SettingRequest extends BaseRequest {
  /**
   *
   * @returns {Promise<BaseRequest._responseHandler.props.data|undefined>}
   */
  fetchCryptoSetting() {
    const url = `${schema}/crypto-setting`;
    return this.get(url);
  }

  fetchSettingHash() {
    const url = `${schema}/setting-hash`;
    return this.get(url);
  }

  getMarket() {
    const url = `${schema}/markets`;
    return this.get(url);
  }

  fetchLimitWithdrawal() {
    const url = `${schema}/limit-withdrawals`;
    return this.get(url);
  }
}
