import logo from '../../logo.svg';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectProfile } from './loginSlice';
import { Counter } from '../../features/counter/Counter';

const Home = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const handleLogout = () => {
    // dispatch(setLogout());
  };
  return (
    <div>
      <p>Email:{profile.email}</p>
      <button onClick={handleLogout}>logout</button>
      <br />
      <img src={logo} className="App-logo" alt="logo" />
      <Counter />
    </div>
  );
};

export default Home;
