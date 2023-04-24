import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  logoutAsync,
  selectProfile,
  loginViaLocalAsync,
} from '../app/loginSlice';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import * as styles from '../utils/styles';
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
    <div
      className={`${styles.theme} flex flex-col justify-between h-full w-48 border-r`}
    >
      <div className="flex w-full border-b border-stone-500">
        <Link
          to="/"
          className={`${styles.themeButton} grow h-20 font-bold tracking-widest text-2xl border-r`}
        >
          <div>嗎哪罐子</div>
        </Link>
        <div
          className={`${styles.themeButton} w-7`}
          onClick={() => setToggled(false)}
        >
          ⋮
        </div>
      </div>
      <div className="flex flex-col">
        {navOptions.map((nav) => (
          <Link key={nav.id} to={nav.link}>
            <div
              className={`${styles.navButton} border-b ${
                category === nav.id
                  ? `h-52 ${
                      nav.id === 'sermon'
                        ? 'bg-lime-100'
                        : nav.id === 'devotion'
                        ? 'bg-violet-100'
                        : nav.id === 'shared'
                        ? 'bg-amber-100'
                        : 'bg-stone-100'
                    }`
                  : 'h-[60px]'
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
          </Link>
        ))}
        <NavLink to="/graphview">
          {({ isActive }) =>
            isActive ? (
              <div className={`${styles.navButton} h-52 border-b bg-blue-100`}>
                我的罐子
                <Jar className="w-28" />
              </div>
            ) : (
              <div className={`${styles.navButton} h-[62px] border-b`}>
                我的罐子
              </div>
            )
          }
        </NavLink>
      </div>
      <div className="flex justify-end mt-auto h-10 border-t border-stone-500">
        <div className={`${styles.themeButton} grow border-r`}>
          {profile.name} 個人檔案
        </div>
        <div
          className={`${styles.themeButton} w-7`}
          onClick={() => dispatch(logoutAsync())}
        >
          ⎋
        </div>
      </div>
    </div>
  );
};

export default Navigate;
