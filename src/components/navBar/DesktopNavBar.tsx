import { Link, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ReactComponent as Candle } from '../../assets/candle.svg';
import { ReactComponent as Dove } from '../../assets/dove.svg';
import { ReactComponent as Jar } from '../../assets/jar.svg';
import { ReactComponent as Sheep } from '../../assets/sheep.svg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  logoutAsync,
  selectIsToggleMenu,
  selectProfile,
  setToggleMenu,
} from '../../redux/userSlice';
import { Toast } from '../../utils/CustomSwal';
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

const DesktopNavBar = ({
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
      className={`${styles.theme} ${
        toggled ? 'w-48' : 'w-7'
      } lg:hidden fixed z-10 flex flex-col justify-between h-full border-r transition-all`}
    >
      {toggled ? (
        <>
          <div className="flex w-full -mt-[1px] border-b border-stone-500">
            <Link
              to="/"
              className={`${styles.themeButton} grow h-20 font-bold tracking-widest text-2xl border-r`}
            >
              <div>嗎哪罐子</div>
            </Link>
            <div
              className={`${styles.themeButton} w-7`}
              onClick={() => dispatch(setToggleMenu(false))}
            >
              ⋮
            </div>
          </div>
          {profile.isLogin ? (
            <>
              <div className="flex flex-col">
                {navOptions.map((nav) => (
                  <Link key={nav.id} to={nav.link}>
                    <div
                      className={`${styles.navButton} transition-all border-b ${
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
                      {category === nav.id &&
                        (nav.id === 'sermon' ? (
                          <Sheep className="w-28" />
                        ) : nav.id === 'devotion' ? (
                          <Dove className="w-28" />
                        ) : (
                          <Candle className="w-16" />
                        ))}
                    </div>
                  </Link>
                ))}
                <NavLink to="/graphview">
                  {({ isActive }) => (
                    <div
                      className={`${styles.navButton} ${
                        isActive ? 'h-52 bg-blue-100' : 'h-[62px]'
                      } border-b transition-all`}
                    >
                      我的罐子
                      <Jar className={`${isActive ? 'w-28' : 'hidden'}`} />
                    </div>
                  )}
                </NavLink>
              </div>
              <div className="flex justify-end mt-auto h-10 border-t border-stone-500">
                <div
                  className={`${styles.themeButton} grow border-r`}
                  onClick={() =>
                    Swal.fire({
                      html: SWAL_PROFILE_HTML,
                      showConfirmButton: false,
                      background: '#e7e5e4',
                    })
                  }
                >
                  個人檔案
                </div>
                <div
                  className={`${styles.themeButton} w-7`}
                  onClick={() => {
                    Toast.fire({
                      icon: 'info',
                      title: '登出中...',
                    });
                    setTimeout(() => dispatch(logoutAsync()), 800);
                  }}
                >
                  ⎋
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center">請先登入</div>
              <div
                className={`${styles.themeButton} h-10 border-t`}
                onClick={() =>
                  Swal.fire({
                    html: SWAL_ABOUT_HTML,
                    showConfirmButton: false,
                    showCloseButton: true,
                    background: '#e7e5e4',
                  })
                }
              >
                關於嗎哪罐子
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div
            className={`${styles.themeButton} border-b w-full h-20`}
            onClick={() => dispatch(setToggleMenu(true))}
          >
            ≡
          </div>
          {profile.isLogin ? (
            <>
              {navOptions.map((nav) => (
                <Link key={nav.id} to={nav.link}>
                  <div
                    className={`${
                      styles.navButtonSmall
                    } transition-all h-[60px] border-b ${
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
                  ></div>
                </Link>
              ))}
              <NavLink to="/graphview">
                {({ isActive }) => (
                  <div
                    className={`${styles.navButtonSmall} text-stone-500 ${
                      isActive && 'bg-blue-100'
                    } border-b w-full h-[62px] hover:bg-blue-100`}
                  ></div>
                )}
              </NavLink>
              <div className={`border-b border-stone-500 w-full grow`}></div>
              <div
                className={`${styles.themeButton} border-b w-full h-10`}
                onClick={() =>
                  Swal.fire({
                    html: SWAL_PROFILE_HTML,
                    showConfirmButton: false,
                    background: '#e7e5e4',
                  })
                }
              >
                <span className="text-base material-symbols-outlined">
                  person
                </span>
              </div>
            </>
          ) : (
            <>
              <div className={`w-full grow`}></div>
              <div
                className={`${styles.themeButton} h-10 border-t`}
                onClick={() =>
                  Swal.fire({
                    html: SWAL_ABOUT_HTML,
                    showConfirmButton: false,
                    showCloseButton: true,
                    background: '#e7e5e4',
                  })
                }
              >
                ?
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DesktopNavBar;
