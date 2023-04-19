import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  logoutAsync,
  selectProfile,
  loginViaLocalAsync,
} from '../app/loginSlice';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { ReactComponent as Sheep } from '../assets/sheep.svg';
import { ReactComponent as Dove } from '../assets/dove.svg';
import { ReactComponent as Candle } from '../assets/candle.svg';
import { ReactComponent as Jar } from '../assets/jar.svg';

interface Prop {
  setToggled: React.Dispatch<React.SetStateAction<boolean>>;
}

const navOptions = [
  { id: 'sermon', label: '聚會崇拜', link: '/?category=sermon' },
  { id: 'devotion', label: '個人靈修', link: '/?category=devotion' },
  { id: 'shared', label: '分享收藏', link: '/?category=shared' },
];

const Navigate = ({ setToggled }: Prop) => {
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
    <div className="flex flex-col justify-between min-h-screen w-48 border border-stone-500  bg-stone-200 text-stone-500">
      <div className="flex border-b border-stone-500">
        <Link to="/">
          <div className="flex justify-center items-center w-36 h-28 font-bold tracking-widest text-2xl border-r border-stone-500 hover:bg-stone-100">
            嗎哪罐子
          </div>
        </Link>
        <div
          className="grow flex justify-center w-8 items-center hover:bg-stone-100"
          onClick={() => setToggled(false)}
        >
          關
        </div>
      </div>
      <div className="flex flex-col">
        {navOptions.map((nav) => (
          <NavLink to={nav.link}>
            <div
              className={`flex flex-col justify-between py-5 items-center tracking-widest h-16 border-b border-stone-500 hover:bg-stone-100 ${
                category === nav.id
                  ? `h-52 ${
                      nav.id === 'sermon'
                        ? 'bg-blue-100'
                        : nav.id === 'devotion'
                        ? 'bg-violet-100'
                        : nav.id === 'shared'
                        ? 'bg-rose-100'
                        : 'bg-stone-100'
                    }`
                  : ''
              }`}
            >
              {nav.label}
              {category === nav.id ? (
                nav.id === 'sermon' ? (
                  <Sheep className="w-28" />
                ) : nav.id === 'devotion' ? (
                  <Dove className="w-28" />
                ) : (
                  <Candle className="w-16" />
                )
              ) : (
                ''
              )}
            </div>
          </NavLink>
        ))}
        <NavLink to="/graphview">
          {({ isActive }) =>
            isActive ? (
              <div className="flex flex-col justify-between py-5 items-center tracking-widest h-52 border-b border-stone-500 hover:bg-stone-100 bg-lime-100">
                我的罐子
                <Jar className="w-28" />
              </div>
            ) : (
              <div className="flex flex-col justify-between py-5 items-center tracking-widest h-16 border-b border-stone-500 hover:bg-stone-100">
                我的罐子
              </div>
            )
          }
        </NavLink>
      </div>
      <div className="flex justify-end mt-auto h-16 border-t border-stone-500">
        <div className="grow flex justify-center items-center border-r border-stone-500 hover:bg-stone-100">
          welcom! {profile.name}
        </div>
        <div
          className="flex justify-center items-center hover:bg-stone-100"
          onClick={() => dispatch(logoutAsync())}
        >
          logout
        </div>
      </div>
    </div>
  );
};

export default Navigate;
