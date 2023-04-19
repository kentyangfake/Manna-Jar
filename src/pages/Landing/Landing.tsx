import React from 'react';
import Home from './Home';
import Login from './Login';
import { useAppSelector } from '../../app/hooks';
import { selectProfile } from '../../app/loginSlice';

const Landing = () => {
  const profile = useAppSelector(selectProfile);
  return (
    <div className="w-full h-full min-h-screen">
      {profile.isLogin ? <Home /> : <Login />}
    </div>
  );
};

export default Landing;
