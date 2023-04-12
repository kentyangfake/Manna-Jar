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
      <Link to="/">所有筆記</Link>
      <br />
      <Link
        to="/?category=sermon"
        style={category === 'sermon' ? { backgroundColor: 'pink' } : {}}
      >
        聚會崇拜
      </Link>
      <br />
      <Link
        to="/?category=devotion"
        style={category === 'devotion' ? { backgroundColor: 'pink' } : {}}
      >
        個人靈修
      </Link>
      <br />
      <Link
        to="/?category=shared"
        style={category === 'shared' ? { backgroundColor: 'pink' } : {}}
      >
        分享收藏
      </Link>
      <br />
      <Link to="/graphview">Graph View</Link>
      <br />
      <button onClick={() => dispatch(logoutAsync())}>logout</button>
    </div>
  );
};

export default Navigate;
