import { useAppSelector } from '../../redux/hooks';
import { selectProfile } from '../../redux/loginSlice';
import Home from './Home';
import Login from './Login';

const Landing = () => {
  const profile = useAppSelector(selectProfile);
  return (
    <div className="w-full h-full min-h-screen">
      {profile.isLogin ? <Home /> : <Login />}
    </div>
  );
};

export default Landing;
