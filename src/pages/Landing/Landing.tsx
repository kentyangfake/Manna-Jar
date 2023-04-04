import Home from './Home';
import Login from './Login';
import { useAppSelector } from '../../app/hooks';
import { selectProfile } from './loginSlice';

const Landing = () => {
  const profile = useAppSelector(selectProfile);
  return <div>{profile.isLogin ? <Home /> : <Login />}</div>;
};

export default Landing;
//TODO: localstorage login
