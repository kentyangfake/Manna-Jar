import logo from '../../logo.svg';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { logoutAsync, selectProfile } from './loginSlice';
import { Counter } from '../../features/counter/Counter';

const Home = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);

  return (
    <div>
      <p>welcom!{profile.name}</p>
      <button onClick={() => dispatch(logoutAsync())}>logout</button>
      <br />
      <img src={logo} className="App-logo" alt="logo" />
      <Counter />
    </div>
  );
};

export default Home;
