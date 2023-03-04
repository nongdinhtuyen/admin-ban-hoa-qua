import SplashScreen from './SplashScreen';
import React from 'react';
import { useSelector } from 'react-redux';

type Props = {
  children: React.ReactNode;
};

export default function NeedInitComponent({ children }: Props) {
  const { inited } = useSelector((state: IStateReducers) => state.initReducer);
  return inited ? <>{children}</> : <SplashScreen />;
}
