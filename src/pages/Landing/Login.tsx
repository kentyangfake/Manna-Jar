import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  loginViaLocalAsync,
  selectIsLoading,
  selectProfile,
} from '../../redux/loginSlice';
import * as styles from '../../utils/styles';
import Banner from './loginPage/Banner';
import Preloader from './loginPage/Preloader';
import Section1 from './loginPage/Section1';
import Section2 from './loginPage/Section2';
import Section3 from './loginPage/Section3';

const Login = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const isLoading = useAppSelector(selectIsLoading);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('id');
    const loginViaLocal = async () => {
      if (id) {
        const parsedId = JSON.parse(id);
        await dispatch(loginViaLocalAsync({ id: parsedId }));
        if (profile.isLogin === false) {
          navigate('/');
        }
      }
    };
    loginViaLocal();
  }, [profile.isLogin]);

  return isLoading ? (
    <Preloader />
  ) : (
    <div className={`${styles.theme} flex flex-col min-h-screen`}>
      <Banner />
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
  );
};

export default Login;
