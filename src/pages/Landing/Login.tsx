import React, { useRef, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import {
  loginAsync,
  signUpAsync,
  loginViaLocalAsync,
  selectProfile,
  selectIsLoading,
} from '../../app/loginSlice';
import * as styles from '../../utils/styles';
import TypedString from '../../components/TypedString';
import autoVerse from '../../assets/autoVerse.mp4';
import backLinks from '../../assets/backLinks.mp4';
import NetworkGraph from '../../components/NetworkGraph';
import { NoteType } from '../../app/types';
import { ReactComponent as Sheep } from '../../assets/sheep.svg';
import { ReactComponent as Dove } from '../../assets/dove.svg';
import { ReactComponent as Candle } from '../../assets/candle.svg';
import loading from '../../assets/loading.gif';
import scrollDown from '../../assets/scroll-down.gif';

const demoNotesTitles = [
  '出人意外的平安',
  '撒迦利雅書',
  '傳道談話',
  '與神同行',
  '得人如魚',
  '聽命勝於獻祭',
  '用基督的口舌',
  '智慧的開端',
  '挑戰天性',
  '風雨中的避難所',
  '你可情願',
  '做鹽做光',
  '風雨生信心',
  '約伯記',
  '也不冷也不熱',
  '重建會幕',
  '洗禮的奧秘',
  '神殿中的青橄欖樹',
  '當你心懷不平',
  '愛的真諦',
];
let demoNotesList: NoteType[] = [];
demoNotesTitles.map((title, index) =>
  demoNotesList.push({
    id: index.toString(),
    title: title,
    content: '',
    category: 'sermon',
    link_notes: [],
    create_time: 1,
    edit_time: 1,
  })
);

const demoNotes: NoteType[] = demoNotesList;

const Login = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const isLoading = useAppSelector(selectIsLoading);
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
              <div className="flex items-center border-b border-stone-500 p-2">
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
              {isSignUp ? (
                <div
                  className={`${styles.themeButton} text-xs self-center mt-4 border w-16 h-8`}
                  onClick={handleSingUp}
                >
                  {isLoading ? <img src={loading} alt="loading..." /> : '註冊'}
                </div>
              ) : (
                <div
                  className={`${styles.themeButton} text-xs self-center mt-4 border w-16 h-8`}
                  onClick={handleLogin}
                >
                  {isLoading ? <img src={loading} alt="loading..." /> : '登入'}
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
                  出埃及記16:4
                  <br />
                  按下空白鍵，經文就會自動出現！
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[45vw] flex flex-col justify-center items-center border-l text-stone-700 border-stone-500 bg-gradient-to-b from-stone-400 to-stone-300">
          <video
            className="rounded drop-shadow-lg border border-stone-500"
            playsInline
            autoPlay
            muted
            loop
            width="600px"
          >
            <source src={autoVerse} type="video/mp4" />
          </video>
        </div>
      </div>
      {/* section 2 */}
      <div className="flex flex-col text-stone-700">
        <div className="flex justify-end">
          <div className="flex text-xl text-right items-end pr-7 pb-4">
            <p>
              整合你的思緒，擴展你的視野
              <br />
              不論是準備講道或小組分享
              <br />
              嗎哪罐子讓你更容易找到之前的筆記
            </p>
          </div>
          <div className="w-[45vw] text-6xl font-serif font-bold leading-relaxed border-l border-stone-500 pl-7 pt-52">
            以前的筆記,
            <br />
            找不到？
          </div>
        </div>
        <div className="flex grow border-t border-stone-500 mt-20">
          <div className="grow flex justify-center bg-gradient-to-b from-stone-400 to-stone-300">
            <div>
              <video
                className="mt-10 rounded drop-shadow-lg border border-stone-500"
                playsInline
                autoPlay
                muted
                loop
                width="600px"
              >
                <source src={backLinks} type="video/mp4" />
              </video>
              <div className="text-xl text-end mt-5 mr-5">
                只要簡單輸入#
                <br />
                就能建立筆記連結,方便查找
              </div>
            </div>
          </div>
          <div className="w-[45vw] flex flex-col border-l border-stone-500">
            <div className="flex justify-center gap-3 py-5 bg-gradient-to-l hover:bg-gradient-to-r from-stone-400 to-stone-300 border-b border-stone-500">
              <div
                className={`${styles.limeCard} text-xl items-center h-60 w-48 border drop-shadow-lg border-stone-500`}
              >
                聚會崇拜
                <Sheep className="w-32" />
              </div>
              <div
                className={`${styles.violetCard} text-xl items-center h-60 w-48 border drop-shadow-lg border-stone-500`}
              >
                個人靈修
                <Dove className="h-28" />
              </div>
              <div
                className={`${styles.amberCard} text-xl items-center h-60 w-48 border drop-shadow-lg border-stone-500`}
              >
                分享收藏
                <Candle className="w-20" />
              </div>
            </div>
            <div className="flex justify-center h-96 text-xl mt-5">
              根據信仰生活的情境將筆記分類
              <br />
              並與家人朋友分享筆記
            </div>
          </div>
        </div>
      </div>
      {/* section 3 */}
      <div className="flex flex-col text-stone-700">
        <div className="flex flex-col items-center bg-gradient-to-t from-stone-400 to-stone-300 text-stone-700">
          <div className="mt-6 text-6xl font-serif font-bold mb-10">
            我的信仰,像滿天星星
          </div>
          <div className="text-xl">
            一覽無遺你的信仰知識，你可以探索，觀察，從過去的累積獲得靈感和能量。
          </div>
          <div className="cursor-crosshair texture mt-20 h-[70vh] w-[70%] rounded-[100%/100%] bg-stone-300 border border-stone-500">
            <NetworkGraph filtBy={'all'} userNotes={demoNotes} noEvent />
          </div>
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
          className={`flex flex-col justify-center items-center mt-auto mb-10 text-center text-xl pb-7 leading-loose text-stone-200 hover:bg-stone-400 h-32 w-60 rounded-[100%/100%] border border-stone-300`}
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            })
          }
        >
          <div className="animate-bounce">↑</div>
          一起來寫筆記吧
        </div>
      </div>
    </div>
  );
};

export default Login;
