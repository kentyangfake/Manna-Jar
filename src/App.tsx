import React, { useState } from 'react';
import { Outlet, useSearchParams, Link, NavLink } from 'react-router-dom';
import './App.css';
import Navigate from './components/Navigate';
import * as styles from './utils/styles';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  selectProfile,
  selectIsToggleMenu,
  setToggleMenu,
} from './app/loginSlice';
import Swal from 'sweetalert2';

const navOptions = [
  { id: 'sermon', label: '聚會崇拜', link: '/?category=sermon' },
  { id: 'devotion', label: '個人靈修', link: '/?category=devotion' },
  { id: 'shared', label: '分享收藏', link: '/?category=shared' },
];

function App() {
  const dispatch = useAppDispatch();
  const toggled = useAppSelector(selectIsToggleMenu);
  const profile = useAppSelector(selectProfile);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';

  return (
    <div className="App">
      <div className="relative flex w-screen h-full bg-stone-300">
        <div className={toggled ? 'fixed z-10 h-full' : 'hidden'}>
          <Navigate />
        </div>
        <div
          className={
            toggled
              ? 'hidden'
              : `${styles.theme} fixed z-10 flex flex-col h-full w-7 border-r`
          }
        >
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
                    className={`${styles.navButtonSmall} h-[60px] border-b ${
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
                    title: profile.name,
                    text: `共有 ${profile.notes.length} 篇筆記`,
                    showConfirmButton: false,
                    background: '#f5f5f4',
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
                    title: '關於我們',
                    text: '由YuChien開發的個人專案',
                    showConfirmButton: false,
                    background: '#f5f5f4',
                  })
                }
              >
                ?
              </div>
            </>
          )}
        </div>
        <div className={`grow ${toggled ? 'ml-48' : 'ml-7'}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
