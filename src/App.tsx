import React, { useState } from 'react';
import { Outlet, useSearchParams, Link, NavLink } from 'react-router-dom';
import './App.css';
import Navigate from './components/Navigate';
import * as styles from './utils/styles';
import { useAppDispatch } from './app/hooks';
import { logoutAsync } from './app/loginSlice';

const navOptions = [
  { id: 'sermon', label: '聚會崇拜', link: '/?category=sermon' },
  { id: 'devotion', label: '個人靈修', link: '/?category=devotion' },
  { id: 'shared', label: '分享收藏', link: '/?category=shared' },
];

function App() {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const [toggled, setToggled] = useState(false);
  return (
    <div className="App">
      <div className="flex w-screen h-full bg-stone-300">
        <div className={toggled ? 'fixed' : 'hidden'}>
          <Navigate setToggled={setToggled} />
        </div>
        <div
          className={
            toggled
              ? 'hidden'
              : `${styles.theme} fixed flex flex-col min-h-screen w-7 border-r`
          }
        >
          <div
            className={`${styles.themeButton} border-b w-full h-20 mt-[1px]`}
            onClick={() => setToggled(true)}
          >
            開
          </div>
          {navOptions.map((nav) => (
            <Link to={nav.link}>
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
                className={`${styles.navButtonSmall} ${
                  isActive && 'bg-blue-100'
                } border-b w-full h-[62px] hover:bg-blue-100`}
              ></div>
            )}
          </NavLink>
          <div className={`border-b border-stone-500 w-full grow`}></div>
          <div
            className={`${styles.themeButton} border-b w-full h-10`}
            onClick={() => dispatch(logoutAsync())}
          >
            出
          </div>
        </div>
        <div className={`w-full ${toggled ? 'ml-48' : 'ml-7'}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
