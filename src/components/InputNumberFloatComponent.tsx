/* eslint-disable */
// import { isNaN } from "lodash";
import { Button, InputNumber } from 'antd';
import BigNumber from 'bignumber.js';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const WrapperComponent = styled.div`
  position: relative;
  .suffix-wrap {
    position: absolute;
    top: 1px;
    right: 1px;
    height: 100%;

    button {
      font-weight: bold;
      font-size: 13px !important;
      color: #0a4ddd;
      margin: 0px 0px 0px 5px;
      height: 94%;
      border-width: 0px 0 0 1.5px;
      border-radius: 0 20px 20px 0;

      &:focus {
        color: #0a4ddd;
        border-color: #d9d9d9;
      }
      &:hover {
        border-color: #d9d9d9;
      }
    }
  }
`;

export default function InputNumberFloatComponent(props) {
  const { onClickMax } = props;
  const [isFloat, setFloat] = useState(false);
  const [internalValue, setInternalValue] = useState<any>(0);
  const [internalPrecision, setInternalPrecision] = useState<any>(0);
  const ref = useRef('');
  const input = props.refInput ? props.refInput : ref;
  const placeholder = props.placeholder || '';

  useEffect(() => {
    setFloat(props.value !== '' || props.value !== null);
  }, [props.value]);

  const precision = props.customPrecision || 8;

  return (
    <WrapperComponent>
      <InputNumber
        placeholder={placeholder}
        id={props.name || ''}
        ref={input}
        suffix='test'
        step={props.value || 1e-8}
        formatter={(v: any) => {
          if (v == '' || v == null) {
            return '';
          }
          if (v == '0') {
            return '0';
          }
          if (new BigNumber(v).isNaN()) {
            return `${internalValue}.${internalPrecision}`;
          }

          if (
            `${v}`.endsWith('.') ||
            `${v}`.endsWith('.0') ||
            `${v}`.endsWith('.00') ||
            `${v}`.endsWith('.000') ||
            `${v}`.endsWith('.0000') ||
            `${v}`.endsWith('.00000') ||
            `${v}`.endsWith('.000000') ||
            `${v}`.endsWith('.0000000') ||
            `${v}`.endsWith('.00000000')
          ) {
            const [x1, x2] = v.split('.');
            setInternalValue(x1);
            setInternalPrecision(x2);

            return `${new BigNumber(x1 || 0).toFormat()}.${x2}`;
          }

          if (`${v}`.includes('.')) {
            const [x1, x2] = `${v}`.split('.');
            if (x2.length > (precision || 8)) {
              return `${new BigNumber(x1).toFormat()}.${x2.substr(0, precision || 8)}`;
            }

            setInternalValue(x1);
            setInternalPrecision(x2);
            return `${new BigNumber(x1 || 0).toFormat()}.${x2}`;
          }

          return new BigNumber(v || 0).toFormat();
        }}
        {...props}
        onFocus={() => {
          if (props.overrideFocus) {
            props.overrideFocus();
            setFloat(true);
          } else {
            setFloat(true);
          }
        }}
        onBlur={() => {
          const isNaN = new BigNumber(props.value).isNaN();
          setFloat(!isNaN);
          props?.onBlur();
        }}
        maxLength={18}
        className={props.className ? props.className : ''}
        style={{
          // border: '1px solid red',
          paddingRight: props.suffix ? 104.45 : 25,
        }}
      />
      {props.suffix ? (
        <div className='suffix-wrap'>
          <label
            htmlFor={props.name || ''}
            style={{
              // position: 'absolute',
              // top: '25%',
              // right: '30px',
              // transform: "translateY(-50%)",
              fontFamily: 'monospace',
            }}
          >
            {props.suffix}
          </label>
          <Button onClick={onClickMax} type='text'>
            {`${window.$t('Deposit.wallet.max')}`}
          </Button>
        </div>
      ) : (
        ''
      )}
    </WrapperComponent>
  );
}
