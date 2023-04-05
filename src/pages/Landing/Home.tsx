import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { logoutAsync, selectProfile } from '../../app/loginSlice';
import { Counter } from '../../features/counter/Counter';

const Home = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);

  return (
    <div>
      <p>welcom!{profile.name}</p>
      <button onClick={() => dispatch(logoutAsync())}>logout</button>
      <br />
      <Counter />
    </div>
  );
};

export default Home;
