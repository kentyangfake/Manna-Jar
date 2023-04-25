import React, { useRef, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link, useNavigate } from 'react-router-dom';
import {
  loginAsync,
  signUpAsync,
  loginViaLocalAsync,
  selectProfile,
} from '../../app/loginSlice';
import * as styles from '../../utils/styles';
import { ReactComponent as Star } from '../../assets/star.svg';

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

  const features = ['極速經文！', '筆記連結！', '信仰累積！'];

  return (
    <div className={`${styles.theme} flex flex-col min-h-screen`}>
      <div className="banner h-[90vh] flex justify-end">
        <div className="bg-[rgba(214,211,208,0.7)] border-l border-stone-500 flex flex-col">
          <div className="backdrop-blur-sm text-8xl text-lime-100 font-semibold tracking-widest py-8 pl-5 pr-44 border-b border-stone-500">
            嗎哪罐子
          </div>
          <div className="bg-[rgba(214,211,208,0.6)] font-serif font-semibold text-6xl pl-5 py-3 border-b border-stone-500">
            教徒の筆記本
          </div>
          <div className="flex grow">
            <div className="backdrop-blur-sm flex flex-col justify-center gap-5 p-8">
              {features.map((feat, index) => (
                <div
                  key={index}
                  className="flex items-center font-semibold text-2xl"
                >
                  <Star className="h-10 w-14" />
                  {feat}
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center px-8 grow border-l border-stone-500 bg-[rgba(214,211,208,0.6)]">
              <div className="flex justify-center">
                <div
                  className={`${
                    !isSignUp && 'text-violet-500'
                  } cursor-pointer border-r border-stone-500 px-2`}
                  onClick={() => setIsSignUp(false)}
                >
                  登入
                </div>
                <div
                  className={`${
                    isSignUp && 'text-violet-500'
                  } cursor-pointer px-2`}
                  onClick={() => setIsSignUp(true)}
                >
                  註冊
                </div>
              </div>
              {isSignUp && (
                <div className="flex items-center border-b p-2">
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
              <div className="flex items-center border-b p-2">
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
              <div className="flex items-center border-b p-2">
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
                  className="pr-4"
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
                  className="w-16 flex justify-center self-center mt-4 items-center cursor-pointer border border-stone-500"
                  onClick={handleSingUp}
                >
                  註冊
                </div>
              ) : (
                <div
                  className="w-16 flex justify-center self-center mt-4 items-center cursor-pointer border border-stone-500"
                  onClick={handleLogin}
                >
                  登入
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[30vh]">特色:可以自動輸入經文</div>
      <div>特色:筆記跟筆記可以建立關聯,方便查找</div>
      <div>特色:像星空一樣的筆記累積成果</div>
    </div>
  );
};

export default Login;
