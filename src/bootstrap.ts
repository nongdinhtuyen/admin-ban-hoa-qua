// boot
import axios, { ParamsSerializerOptions } from 'axios';
import BigNumber from 'bignumber.js';
import { IStringifyOptions, parse, ParsedQs, stringify } from 'qs';

import _ from 'lodash';

BigNumber.config({
  FORMAT: {
    // string to prepend
    prefix: '',
    // decimal separator
    decimalSeparator: '.',
    // grouping separator of the integer part
    groupSeparator: ',',
    // primary grouping size of the integer part
    groupSize: 3,
    // secondary grouping size of the integer part
    secondaryGroupSize: 0,
    // grouping separator of the fraction part
    fractionGroupSeparator: ' ',
    // grouping size of the fraction part
    fractionGroupSize: 0,
    // string to append
    suffix: '',
  },
});

window.axios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    encode: (param: string): ParsedQs => parse(param),
    serialize: (params: Record<string, any>, options?: ParamsSerializerOptions | IStringifyOptions | any): string => stringify(params, options),
    indexes: false, // array indexes format (null - no brackets, false (default) - empty brackets, true - brackets with indexes)
  },
});
