import Home from './Home';
import Login from './Login';
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectIsLogin } from './loginSlice';

const Landing = () => {
  const profile = useAppSelector(selectIsLogin);
  return <div>{profile.isLogin ? <Home /> : <Login />}</div>;
};

export default Landing;
