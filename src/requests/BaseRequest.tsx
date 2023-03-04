import utils from '../common/utils';
import consts, { NOTIFICATION_TYPE } from '../constants/consts';
import { openNotification } from 'common/Notify';
import { t } from 'i18next';
import React from 'react';

import _ from 'lodash';

const str = {
  'Data Not Existed!': t('BaseRequest.data_not_existed'),
  USER_INFO_EMPTY: t('BaseRequest.user_info_empty'),
};

const obj = {
  'Contract_Address is required!': t('BaseRequest.contract_address_required'),
  'Image is required!': t('BaseRequest.image_require'),
  'Contract_Address is not valid!': t('BaseRequest.contract_address_invalid'),
  'limit must be greater than 0.00000001': t('BaseRequest.require_limit_value_greater_than'),
  'the length must be between 26 and 42': t('BaseRequest.length_must_be_between_26_and_42'),
};

const mapWords = {
  fee: t('BaseRequest.fee'),
  'cannot be blank': t('BaseRequest.cannot_empty'),
  'Existed !': t('BaseRequest.existed'),
  'The system is having problems.': t('BaseRequest.system_having_problems'),
  'Withdraw exceed limit': t('BaseRequest.withdraw_exceed_limit'),
};

const getWord = (field) => _.get(mapWords, field, field);

export default class BaseRequest {
  version = 'v1/cryptotrading';

  prefix() {
    return '';
  }

  async get(url, params = {}, config = {}) {
    try {
      const response = await window.axios.get(`${this.version}/${url}`, {
        ...config,
        params,
      });
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async getWithTimeout(url, params = {}, timeout = 60) {
    try {
      const response = await window.axios.get(`${this.version}/${url}`, {
        params,
        timeout,
      });
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async put(url, data = {}, config = {}) {
    try {
      const response = await window.axios.put(`${this.version}/${url}`, data, config);
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async post(url, data = {}, config = {}) {
    try {
      const response = await window.axios.post(`${this.version}/${url}`, data, config);
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async del(url, params = {}) {
    try {
      const response = await window.axios.delete(`${this.version}/${url}`, params);
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async _responseHandler(response) {
    const { data } = response;

    if (!data) {
      openNotification({
        description: t('BaseRequest.result_undefined'),
        type: NOTIFICATION_TYPE.TYPE_ERROR,
      });
    }

    const errorCode = _.get(data, ['error', 'code'], 200);
    const message = _.get(data, ['error', 'message'], '');
    let errorsNode: React.ReactNode = '';

    if (errorCode >= 400) {
      if (_.isString(message)) {
        errorsNode = _.upperFirst(getWord(message));
      } else {
        errorsNode = (
          <>
            {_.map(message, (text, field) => (
              <div id={field}>{_.upperFirst(_.get(obj, text) ? _.get(obj, text) : `${getWord(field)} ${getWord(text)}`)}</div>
            ))}
          </>
        );
      }
      openNotification({
        description: errorsNode,
        type: NOTIFICATION_TYPE.TYPE_ERROR,
      });
      if (errorCode === 405) {
      }
      throw 'Request failed';
    } else if (errorCode >= 300) {
      if (typeof data.error.message === 'string') {
        errorsNode = <div className='bold'>{_.upperFirst(_.get(str, message) || message)}</div>;
      } else {
        errorsNode = (
          <>
            {_.map(data.error.message, (message, field) => (
              <div id={field}>{_.upperFirst(_.get(obj, message) ? _.get(obj, message) : `${getWord(field)} ${message}`)}</div>
            ))}
          </>
        );
      }

      openNotification({
        description: errorsNode,
        type: NOTIFICATION_TYPE.TYPE_WARNING,
      });
      throw 'Request error';
    }

    return data;
  }

  _errorHandler(err) {
    if (err.response && err.response.status === 401) {
      // Unauthorized (session timeout)
      // window.$dispatch(actions.actionLogout());
      openNotification({
        description: 'Unauthorized',
        type: NOTIFICATION_TYPE.TYPE_ERROR,
      });
    }
    throw err;
  }
}
