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
    <div className="flex-col h-screen w-48 pl-8 pt-8 bg-zinc-100">
      <div className="font-bold tracking-widest text-2xl">
        <Link to="/">嗎哪罐子</Link>
      </div>
      <div>
        <Link
          to="/?category=sermon"
          style={category === 'sermon' ? { backgroundColor: 'pink' } : {}}
        >
          聚會崇拜
        </Link>
      </div>
      <div>
        <Link
          to="/?category=devotion"
          style={category === 'devotion' ? { backgroundColor: 'pink' } : {}}
        >
          個人靈修
        </Link>
      </div>
      <div>
        <Link
          to="/?category=shared"
          style={category === 'shared' ? { backgroundColor: 'pink' } : {}}
        >
          分享收藏
        </Link>
      </div>
      <div>
        <Link to="/graphview">Graph View</Link>
      </div>
      <p className="justify-self-end self-end">welcom!{profile.name}</p>
      <span onClick={() => dispatch(logoutAsync())}>logout</span>
    </div>
  );
};

export default Navigate;
