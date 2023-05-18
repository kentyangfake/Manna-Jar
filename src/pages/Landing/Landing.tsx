import { useAppSelector } from '../../redux/hooks';
import { selectProfile } from '../../redux/userSlice';
import Home from './Home';
import LoginPage from './LoginPage';

const Landing = () => {
  const profile = useAppSelector(selectProfile);
  return (
    <div className="w-full h-full min-h-screen">
      {profile.isLogin ? <Home /> : <LoginPage />}
    </div>
  );
};

export default Landing;
