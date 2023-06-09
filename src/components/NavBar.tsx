import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loginViaLocalAsync, selectProfile } from '../redux/userSlice';
import { aboutContent } from '../utils/sampleText';
import DesktopNavBar from './navBar/DesktopNavBar';
import MobileNavBar from './navBar/MobileNavBar';

const navOptions = [
  { id: 'sermon', label: '聚會崇拜', link: '/?category=sermon' },
  { id: 'devotion', label: '個人靈修', link: '/?category=devotion' },
  { id: 'shared', label: '分享收藏', link: '/?category=shared' },
];

const NavBar = () => {
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

  const SWAL_PROFILE_HTML = `<div class='flex flex-col tracking-widest leading-relaxed text-start'><p class='text-2xl font-semibold mb-2'>${
    profile.name
  }的個人檔案</p><p class="text-sm">帳號: ${profile.email}</p>
  <hr class="mt-5 mb-6 w-full border-b border-stone-400">
  <p>共有 <span class="font-bold">${profile.notes.length - 1}</span> 篇筆記</p>
  <p>聚會崇拜: <span class="font-bold">${
    profile.notes.filter((note) => note.category === 'sermon').length
  }</span>篇</p>
  <p>個人靈修: <span class="font-bold">${
    profile.notes.filter((note) => note.category === 'devotion').length
  }</span>篇</p>
  <p>收藏了 <span class="font-bold">${
    profile.notes.filter((note) => note.category === 'shared').length
  }</span>篇 筆記</p>
  <p class="mt-5">我本週寫了 <span class="font-bold text-violet-400">${
    profile.notes.filter(
      (note) =>
        (note.category === 'sermon' || note.category === 'devotion') &&
        new Date().getTime() - note.create_time < 604800000
    ).length
  }篇</span> 筆記</p>
  </div>`;

  const SWAL_ABOUT_HTML =
    `<div class='tracking-widest leading-relaxed text-start'><p class='text-2xl font-semibold mb-2'>關於嗎哪罐子</p>${aboutContent}</div>` +
    `</br>` +
    `<div class="flex tracking-widest justify-center items-center gap-4">
  <a href="https://www.facebook.com/yuchien.yang.9/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/></svg></a>
  <a href="https://github.com/kentyangfake/Manna-Jar/tree/develop"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
  <a href="https://www.linkedin.com/in/yu-chien-yang-fe"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/></svg></a>
  </div>`;

  return (
    <>
      <MobileNavBar
        SWAL_PROFILE_HTML={SWAL_PROFILE_HTML}
        SWAL_ABOUT_HTML={SWAL_ABOUT_HTML}
        navOptions={navOptions}
        category={category}
      />
      <DesktopNavBar
        SWAL_PROFILE_HTML={SWAL_PROFILE_HTML}
        SWAL_ABOUT_HTML={SWAL_ABOUT_HTML}
        navOptions={navOptions}
        category={category}
      />
    </>
  );
};

export default NavBar;
