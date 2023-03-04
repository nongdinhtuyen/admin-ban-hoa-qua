import React from 'react';
import { useSelector } from 'react-redux';

type Props = {
  symbol: string;
  name?: boolean;
  className?: string;
};

export default function CoinComponent({ symbol = 'TRUSTK', name = false, className = '' }: Props) {
  const { coins } = useSelector((state: IStateReducers) => state.settingReducer);
  return (
    <div className={'flex gap-x-2 items-center' + className}>
      <img className='w-5 h-5' src={coins[symbol].icon_image} />
      <div>{coins[symbol].coin}</div>
      {name && <div>{coins[symbol].name}</div>}
    </div>
  );
}
