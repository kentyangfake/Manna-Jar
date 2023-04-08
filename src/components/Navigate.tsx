import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  logoutAsync,
  selectProfile,
  loginViaLocalAsync,
} from '../app/loginSlice';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const Navigate = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const navigate = useNavigate();
  //TODO:根據分類顯示顏色
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';

  useEffect(() => {
    if (profile.isLogin) {
      return;
    }
    const id = localStorage.getItem('id');
    const loginViaLocal = async () => {
      if (id) {
        const parsedId = JSON.parse(id);
        await dispatch(loginViaLocalAsync({ id: parsedId }));
      } else {
        navigate('/');
      }
    };
    loginViaLocal();
  }, [profile.isLogin]);

  return (
    <div style={{ backgroundColor: 'lightgray' }}>
      <p>welcom!{profile.name}</p>
      <Link to="/">Home</Link>
      <br />
      <Link to="/graphview">Graph View</Link>
      <br />
      <button onClick={() => dispatch(logoutAsync())}>logout</button>
    </div>
  );
};

export default Navigate;
