import { useRef, useState } from 'react';
import scrollDown from '../../../assets/scroll-down.gif';
import TypedString from '../../../components/TypedString';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  loginAsync,
  selectIsLoading,
  signUpAsync,
} from '../../../redux/loginSlice';
import * as styles from '../../../utils/styles';

const Banner = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const [isSignUp, setIsSignUp] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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
    <div
      className={`relative ${styles.theme} border-b banner h-[90vh] flex justify-between items-center`}
    >
      <div className="bg-[rgba(214,211,208,0.6)] backdrop-blur-sm font-serif font-semibold text-4xl text-stone-700 ml-[10%] pl-5 py-3 border h-fit border-stone-500">
        <TypedString
          context={[
            '給基督徒の筆記本',
            '自動輸入經文',
            '組織知識網路',
            '看見信仰成長',
            '教徒の筆記本.',
          ]}
        />
      </div>
      <div className="h-full border-l border-stone-500 flex flex-col">
        <div className="bg-gradient-to-t from-stone-100 to-[rgba(214,211,208,0.6)] text-6xl text-stone-700 font-semibold tracking-widest h-[20%] border-b border-stone-500 flex justify-center items-center">
          嗎哪罐子
        </div>
        <div className="flex grow">
          <div className="flex flex-col pt-[20vh] px-8 bg-gradient-to-b hover:bg-gradient-to-t from-stone-100 to-[rgba(214,211,208,0.8)]">
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
                  required
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
                required
                ref={emailRef}
              />
            </div>
            <div className="flex flex-col border-b border-stone-500 p-2">
              <div className="flex items-center">
                <span className="text-base material-symbols-outlined py-4">
                  lock
                </span>
                <input
                  className="h-10 bg-[rgba(0,0,0,0)] grow pl-2 placeholder:text-stone-400 focus:outline-none"
                  type={hidePassword ? 'password' : 'text'}
                  placeholder="密碼"
                  required
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
              {isSignUp && (
                <span className="text-xs -mt-2">
                  ※英文加數字至少6碼,注意大小寫
                </span>
              )}
            </div>
            {isSignUp ? (
              <div
                className={`${styles.themeButton} text-xs self-center mt-4 border w-16 h-8`}
                onClick={handleSingUp}
              >
                註冊
              </div>
            ) : (
              <div
                className={`${styles.themeButton} text-xs self-center mt-4 border w-16 h-8`}
                onClick={handleLogin}
              >
                登入
              </div>
            )}
          </div>
        </div>
      </div>
      <img
        className="absolute bottom-0 left-[48%] w-28"
        src={scrollDown}
        alt="scrallDown"
      />
    </div>
  );
};

export default Banner;
