import SettingRequest from './SettingRequest';
import TransactionRequest from './TransactionRequest';
import UserRequest from './UserRequest';

const requestMap = {
  SettingRequest,
  UserRequest,
  TransactionRequest,
};

const instances = {};

export default class RequestFactory {
  static getRequest(classname: string) {
    const RequestClass = requestMap[classname];
    if (!RequestClass) {
      throw new Error(`Invalid request class name: ${classname}`);
    }

    let requestInstance = instances[classname];
    if (!requestInstance) {
      requestInstance = new RequestClass();
      instances[classname] = requestInstance;
    }
    return requestInstance;
  }
}
