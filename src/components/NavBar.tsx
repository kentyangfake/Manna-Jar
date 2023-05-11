import { useEffect } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ReactComponent as Candle } from '../assets/candle.svg';
import { ReactComponent as Dove } from '../assets/dove.svg';
import { ReactComponent as Jar } from '../assets/jar.svg';
import { ReactComponent as Sheep } from '../assets/sheep.svg';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  loginViaLocalAsync,
  logoutAsync,
  selectIsToggleMenu,
  selectProfile,
  setToggleMenu,
} from '../redux/userSlice';
import { aboutContent } from '../utils/sampleText';
import * as styles from '../utils/styles';

const navOptions = [
  { id: 'sermon', label: '聚會崇拜', link: '/?category=sermon' },
  { id: 'devotion', label: '個人靈修', link: '/?category=devotion' },
  { id: 'shared', label: '分享收藏', link: '/?category=shared' },
];

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

const NavBar = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const toggled = useAppSelector(selectIsToggleMenu);
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
    <>
      <div
        className={`${styles.theme} lg:flex hidden fixed top-0 right-0 z-50 justify-between w-full h-12 border-b transition-all`}
      >
        {profile.isLogin ? (
          <div
            className={`${styles.themeButton} w-10`}
            onClick={() =>
              Swal.fire({
                html: `<div class='flex flex-col tracking-widest leading-relaxed text-start'><p class='text-2xl font-semibold mb-2'>${
                  profile.name
                }的個人檔案</p><p class="text-sm">帳號: ${profile.email}</p>
                <hr class="mt-5 mb-6 w-full border-b border-stone-400">
                <p>共有 <span class="font-bold">${
                  profile.notes.length - 1
                }</span> 篇筆記</p>
                <p>聚會崇拜: <span class="font-bold">${
                  profile.notes.filter((note) => note.category === 'sermon')
                    .length
                }</span>篇</p>
                <p>個人靈修: <span class="font-bold">${
                  profile.notes.filter((note) => note.category === 'devotion')
                    .length
                }</span>篇</p>
                <p>收藏了 <span class="font-bold">${
                  profile.notes.filter((note) => note.category === 'shared')
                    .length
                }</span>篇 筆記</p>
                <p class="mt-5">我本週寫了 <span class="font-bold text-violet-400">${
                  profile.notes.filter(
                    (note) =>
                      (note.category === 'sermon' ||
                        note.category === 'devotion') &&
                      new Date().getTime() - note.create_time < 604800000
                  ).length
                }篇</span> 筆記</p>
                </div>`,
                confirmButtonText: '登出',
                confirmButtonColor: '#d6d3d1',
                background: '#e7e5e4',
              }).then((result) => {
                if (result.isConfirmed) {
                  Toast.fire({
                    icon: 'info',
                    title: '登出中...',
                  });
                  setTimeout(() => dispatch(logoutAsync()), 800);
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
              Swal.fire({
                html:
                  `<div class='tracking-widest leading-relaxed text-start'><p class='text-2xl font-semibold mb-2'>關於嗎哪罐子</p>${aboutContent}</div>` +
                  `</br>` +
                  `<div class="flex tracking-widest justify-center items-center gap-4">
                  <a href="https://www.facebook.com/yuchien.yang.9/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/></svg></a>
                  <a href="https://github.com/kentyangfake/Manna-Jar/tree/develop"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                  <a href="https://www.linkedin.com/in/yu-chien-yang-fe"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/></svg></a>
                  </div>`,
                showConfirmButton: false,
                showCloseButton: true,
                background: '#e7e5e4',
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
      {/* desktop navbar */}
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
                        className={`${
                          styles.navButton
                        } transition-all border-b ${
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
                        html: `<div class='flex flex-col tracking-widest leading-relaxed text-start'><p class='text-2xl font-semibold mb-2'>${
                          profile.name
                        }的個人檔案</p><p class="text-sm">帳號: ${
                          profile.email
                        }</p>
                  <hr class="mt-5 mb-6 w-full border-b border-stone-400">
                  <p>共有 <span class="font-bold">${
                    profile.notes.length - 1
                  }</span> 篇筆記</p>
                  <p>聚會崇拜: <span class="font-bold">${
                    profile.notes.filter((note) => note.category === 'sermon')
                      .length
                  }</span>篇</p>
                  <p>個人靈修: <span class="font-bold">${
                    profile.notes.filter((note) => note.category === 'devotion')
                      .length
                  }</span>篇</p>
                  <p>收藏了 <span class="font-bold">${
                    profile.notes.filter((note) => note.category === 'shared')
                      .length
                  }</span>篇 筆記</p>
                  <p class="mt-5">我本週寫了 <span class="font-bold text-violet-400">${
                    profile.notes.filter(
                      (note) =>
                        (note.category === 'sermon' ||
                          note.category === 'devotion') &&
                        new Date().getTime() - note.create_time < 604800000
                    ).length
                  }篇</span> 筆記</p>
                  </div>`,
                        showConfirmButton: false,
                        background: '#e7e5e4',
                      })
                    }
                  >
                    個人檔案
                  </div>
                  <div
                    className={`${styles.themeButton} w-7`}
                    onClick={() => dispatch(logoutAsync())}
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
                      html:
                        `<div class='tracking-widest leading-relaxed text-start'><p class='text-2xl font-semibold mb-2'>關於嗎哪罐子</p>${aboutContent}</div>` +
                        `</br>` +
                        `<div class="flex tracking-widest justify-center items-center gap-4">
                  <a href="https://www.facebook.com/yuchien.yang.9/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/></svg></a>
                  <a href="https://github.com/kentyangfake/Manna-Jar/tree/develop"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                  <a href="https://www.linkedin.com/in/yu-chien-yang-fe"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/></svg></a>
                  </div>`,
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
                      html: `<div class='flex flex-col tracking-widest leading-relaxed text-start'><p class='text-2xl font-semibold mb-2'>${
                        profile.name
                      }的個人檔案</p><p class="text-sm">帳號: ${
                        profile.email
                      }</p>
                <hr class="mt-5 mb-6 w-full border-b border-stone-400">
                <p>共有 <span class="font-bold">${
                  profile.notes.length - 1
                }</span> 篇筆記</p>
                <p>聚會崇拜: <span class="font-bold">${
                  profile.notes.filter((note) => note.category === 'sermon')
                    .length
                }</span>篇</p>
                <p>個人靈修: <span class="font-bold">${
                  profile.notes.filter((note) => note.category === 'devotion')
                    .length
                }</span>篇</p>
                <p>收藏了 <span class="font-bold">${
                  profile.notes.filter((note) => note.category === 'shared')
                    .length
                }</span>篇 筆記</p>
                <p class="mt-5">我本週寫了 <span class="font-bold text-violet-400">${
                  profile.notes.filter(
                    (note) =>
                      (note.category === 'sermon' ||
                        note.category === 'devotion') &&
                      new Date().getTime() - note.create_time < 604800000
                  ).length
                }篇</span> 筆記</p>
                </div>`,
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
                      html:
                        `<div class='tracking-widest leading-relaxed text-start'><p class='text-2xl font-semibold mb-2'>關於嗎哪罐子</p>${aboutContent}</div>` +
                        `</br>` +
                        `<div class="flex tracking-widest justify-center items-center gap-4">
                  <a href="https://www.facebook.com/yuchien.yang.9/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/></svg></a>
                  <a href="https://github.com/kentyangfake/Manna-Jar/tree/develop"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                  <a href="https://www.linkedin.com/in/yu-chien-yang-fe"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/></svg></a>
                  </div>`,
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
    </>
  );
};

export default NavBar;
