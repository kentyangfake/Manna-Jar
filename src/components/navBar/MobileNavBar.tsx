import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  logoutAsync,
  selectIsToggleMenu,
  selectProfile,
  setToggleMenu,
} from '../../redux/userSlice';
import { ThemeSwal, Toast } from '../../utils/CustomSwal';
import * as styles from '../../utils/styles';

interface Props {
  SWAL_PROFILE_HTML: string;
  SWAL_ABOUT_HTML: string;
  navOptions: {
    id: string;
    label: string;
    link: string;
  }[];
  category?: string;
}

const MobileNavBar = ({
  SWAL_PROFILE_HTML,
  SWAL_ABOUT_HTML,
  navOptions,
  category,
}: Props) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const toggled = useAppSelector(selectIsToggleMenu);
  return (
    <div
      className={`${styles.theme} lg:flex hidden fixed top-0 right-0 z-50 justify-between w-full h-12 border-b transition-all`}
    >
      {profile.isLogin ? (
        <div
          className={`${styles.themeButton} w-10`}
          onClick={() =>
            ThemeSwal.fire({
              html: SWAL_PROFILE_HTML,
              confirmButtonText: '登出',
            }).then((result) => {
              if (result.isConfirmed) {
                Toast.fire({
                  icon: 'info',
                  title: '登出中...',
                });
                setTimeout(() => dispatch(logoutAsync()), 300);
              }
            })
          }
        >
          <span className="text-base material-symbols-outlined">person</span>
        </div>
      ) : (
        <div
          className={`${styles.themeButton} w-10`}
          onClick={() =>
            ThemeSwal.fire({
              html: SWAL_ABOUT_HTML,
              showConfirmButton: false,
              showCloseButton: true,
            })
          }
        >
          ?
        </div>
      )}
      <Link
        to="/"
        className={`${styles.themeButton} grow font-bold tracking-widest text-2xl border-x`}
      >
        <div>嗎哪罐子</div>
      </Link>
      {toggled ? (
        <div
          className={`${styles.themeButton} w-10`}
          onClick={() => dispatch(setToggleMenu(false))}
        >
          <span className="material-symbols-outlined">expand_less</span>
        </div>
      ) : (
        <div
          className={`${styles.themeButton} w-10`}
          onClick={() => dispatch(setToggleMenu(true))}
        >
          ≡
        </div>
      )}
      {toggled && (
        <div
          className={`fixed top-12 z-40 w-full bg-[rgba(214,211,208,0.7)] backdrop-blur`}
        >
          {profile.isLogin ? (
            <>
              {navOptions.map((nav) => (
                <Link key={nav.id} to={nav.link}>
                  <div
                    className={`${
                      styles.navButtonSmall
                    } transition-all text-stone-500 h-[60px] border-b ${
                      nav.id === 'sermon'
                        ? 'hover:bg-lime-100'
                        : nav.id === 'devotion'
                        ? 'hover:bg-violet-100'
                        : nav.id === 'shared'
                        ? 'hover:bg-amber-100'
                        : 'hover:bg-stone-100'
                    } ${
                      category === nav.id &&
                      `${
                        nav.id === 'sermon'
                          ? 'bg-lime-100'
                          : nav.id === 'devotion'
                          ? 'bg-violet-100'
                          : nav.id === 'shared'
                          ? 'bg-amber-100'
                          : 'bg-stone-100'
                      }`
                    }`}
                  >
                    {nav.label}
                  </div>
                </Link>
              ))}
              <NavLink to="/graphview">
                {({ isActive }) => (
                  <div
                    className={`${styles.navButtonSmall} text-stone-500 ${
                      isActive && 'bg-blue-100'
                    } border-b w-full h-[62px] hover:bg-blue-100`}
                  >
                    我的罐子
                  </div>
                )}
              </NavLink>
            </>
          ) : (
            <div
              className={`${styles.navButtonSmall} cursor-default text-stone-500 border-b w-full h-[62px]`}
            >
              請先登入
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileNavBar;
