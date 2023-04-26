import React, { useRef, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import {
  loginAsync,
  signUpAsync,
  loginViaLocalAsync,
  selectProfile,
} from '../../app/loginSlice';
import * as styles from '../../utils/styles';
import { ReactComponent as Star } from '../../assets/star.svg';
import TypedString from '../../components/TypedString';

const Login = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem('id');
    const loginViaLocal = async () => {
      if (id) {
        const parsedId = JSON.parse(id);
        await dispatch(loginViaLocalAsync({ id: parsedId }));
        if (profile.isLogin === false) {
          navigate('/');
        }
      }
    };
    loginViaLocal();
  }, [profile.isLogin]);

  const handleLogin = () => {
    const emailValue = emailRef.current ? emailRef.current.value : '';
    const passwordValue = passwordRef.current ? passwordRef.current.value : '';
    dispatch(
      loginAsync({
        email: emailValue,
        password: passwordValue,
      })
    );
  };

  const handleSingUp = () => {
    const emailValue = emailRef.current ? emailRef.current.value : '';
    const nameValue = nameRef.current ? nameRef.current.value : '';
    const passwordValue = passwordRef.current ? passwordRef.current.value : '';
    dispatch(
      signUpAsync({
        email: emailValue,
        password: passwordValue,
        name: nameValue,
      })
    );
  };

  return (
    <div className={`${styles.theme} flex flex-col min-h-screen`}>
      {/* banner */}
      <div
        className={`${styles.theme} border-b banner h-[90vh] flex justify-between items-center`}
      >
        <div className="bg-[rgba(214,211,208,0.6)] backdrop-blur-sm font-serif font-semibold text-4xl text-stone-700 ml-[10%] pl-5 py-3 border h-fit border-stone-500">
          <TypedString
            context={[
              '給基督徒の筆記本',
              '自動輸入經文!!',
              '組織知識網路!!',
              '看見信仰累積!!',
              '教徒の筆記本.',
            ]}
          />
        </div>
        <div className="h-full border-l border-stone-500 flex flex-col">
          <div className="bg-gradient-to-b hover:bg-gradient-to-t from-stone-100 to-[rgba(214,211,208,0.6)] text-6xl text-stone-700 font-semibold tracking-widest h-[20%] border-b border-stone-500 flex justify-center items-center">
            嗎哪罐子
          </div>
          <div className="flex grow">
            <div className="flex flex-col justify-center px-8 bg-gradient-to-b hover:bg-gradient-to-t from-stone-100 to-[rgba(214,211,208,0.8)]">
              <div className="flex justify-center">
                <div
                  className={`${
                    !isSignUp && 'text-violet-500'
                  } cursor-pointer border-r border-stone-500 px-2 hover:text-stone-100`}
                  onClick={() => setIsSignUp(false)}
                >
                  登入
                </div>
                <div
                  className={`${
                    isSignUp && 'text-violet-500'
                  } cursor-pointer px-2 hover:text-stone-100`}
                  onClick={() => setIsSignUp(true)}
                >
                  註冊
                </div>
              </div>
              {isSignUp && (
                <div className="flex items-center border-b border-stone-500 p-2">
                  <span className="text-base material-symbols-outlined py-4">
                    person
                  </span>
                  <input
                    className="h-10 bg-[rgba(0,0,0,0)] grow placeholder:text-stone-400 focus:outline-none pl-2"
                    type="text"
                    placeholder="使用者名稱"
                    ref={nameRef}
                  />
                </div>
              )}
              <div className="flex items-center border-b border-stone-500 p-2">
                <span className="text-base material-symbols-outlined py-4">
                  mail
                </span>
                <input
                  className="h-10 bg-[rgba(0,0,0,0)] grow placeholder:text-stone-400 focus:outline-none pl-2"
                  type="text"
                  placeholder="電子信箱"
                  ref={emailRef}
                />
              </div>
              <div className="flex items-center border-b border-stone-500 p-2">
                <span className="text-base material-symbols-outlined py-4">
                  lock
                </span>
                <input
                  className="h-10 bg-[rgba(0,0,0,0)] grow pl-2 placeholder:text-stone-400 focus:outline-none"
                  type={hidePassword ? 'password' : 'text'}
                  placeholder="密碼"
                  ref={passwordRef}
                />
                <span
                  className="pr-4 cursor-pointer"
                  onClick={() => setHidePassword((prev) => !prev)}
                >
                  {hidePassword ? (
                    <span className="text-sm material-symbols-outlined">
                      visibility_off
                    </span>
                  ) : (
                    <span className="text-sm material-symbols-outlined">
                      visibility
                    </span>
                  )}
                </span>
              </div>
              {isSignUp ? (
                <div
                  className={`${styles.themeButton} w-16 self-center mt-4 border`}
                  onClick={handleSingUp}
                >
                  註冊
                </div>
              ) : (
                <div
                  className={`${styles.themeButton} w-16 self-center mt-4 border`}
                  onClick={handleLogin}
                >
                  登入
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* section 1 */}
      <div className="min-h-[650px] border-b border-stone-500 flex justify-end">
        <div className="grow bg-gradient-to-r from-stone-400 to-stone-300">
          <div className="flex items-center h-full">
            <div className="flex-Col w-full text-stone-700">
              <div className="flex justify-center text-6xl font-serif font-bold pb-8 border-b border-stone-500">
                手速,不夠快？
              </div>
              <div className="flex justify-center pt-8">
                <p className="w-96 text-xl">
                  只要簡單輸入經卷索引，例如：
                  <br />
                  羅馬書2:11
                  <br />
                  然後按下空白鍵，經文就會自動出現！
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[45vw] flex justify-center items-center border-l text-stone-700 border-stone-500 bg-gradient-to-b hover:bg-gradient-to-t from-stone-400 to-stone-300">
          自動輸入經文
        </div>
      </div>
      {/* section 2 */}
      <div className="flex flex-col text-stone-700">
        <div className="flex justify-end">
          <div className="flex text-xl text-right items-end pr-7 pb-4">
            <p>
              整合你的思緒，擴展你的視野
              <br />
              不論是準備講道或小組分享，嗎哪罐子讓你能更容易找到之前的筆記
            </p>
          </div>
          <div className="w-[45vw] text-6xl font-serif font-bold leading-relaxed border-l border-stone-500 pl-7 pt-52">
            之前的筆記,
            <br />
            找不到？
          </div>
        </div>
        <div className="flex grow border-t border-stone-500 mt-20">
          <div className="grow bg-gradient-to-b from-stone-400 to-stone-300">
            連結
          </div>
          <div className="w-[45vw] flex flex-col border-l border-stone-500">
            <div className="h-80 bg-gradient-to-r hover:bg-gradient-to-l from-stone-400 to-stone-300 border-b border-stone-500">
              分類
            </div>
            <div className="h-60">分類的解說</div>
          </div>
        </div>
      </div>
      {/* section 3 */}
      <div className="min-h-[650px] flex flex-col text-stone-700">
        <div className="flex flex-col items-center bg-gradient-to-t from-stone-400 to-stone-300 text-stone-700">
          <div className="mt-6 text-6xl font-serif font-bold mb-10">
            我的信仰,像滿天星星
          </div>
          <div className="text-xl">
            讓你一覽無遺你的信仰知識，你可以探索，觀察，從過去的累積獲得靈感和能量。
          </div>
          <div className="texture mt-20 h-[70vh] w-[70%] rounded-[100%/100%] bg-stone-300 border border-stone-500"></div>
        </div>
      </div>
      {/* section 4 */}
      <div className="min-h-[750px] flex flex-col items-center text-stone-700 bg-gradient-to-b from-stone-400 to-stone-500">
        <div className="mt-[35vh] text-stone-100 text-4xl font-serif font-bold tracking-widest text-center">
          我要將糧食從天降給你們。百姓可以出去，每天收每天的分。
        </div>
        <div className="mt-10 text-stone-200 text-xl text-center">
          出埃及記 16:4
        </div>
        <div
          className={`flex justify-center items-center mt-auto mb-10 text-center text-xl pb-7 leading-loose text-stone-200 hover:bg-stone-400 h-32 w-60 rounded-[100%/100%] border border-stone-300`}
        >
          ↑<br />
          一起來寫筆記吧
        </div>
      </div>
    </div>
  );
};

export default Login;
