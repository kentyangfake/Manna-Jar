import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectIsLogin } from './loginSlice';
import { useAppDispatch } from '../../app/hooks';
import { setLogout } from './loginSlice';

const Home = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectIsLogin);
  const handleLogout = () => {
    dispatch(setLogout());
  };
  return (
    <div>
      <p>Name:{profile.name}</p>
      <p>Email:{profile.email}</p>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Home;
