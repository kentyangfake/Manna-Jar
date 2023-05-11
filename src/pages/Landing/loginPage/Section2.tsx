import backLinks from '../../../assets/backLinks.mp4';
import { ReactComponent as Candle } from '../../../assets/candle.svg';
import { ReactComponent as Dove } from '../../../assets/dove.svg';
import { ReactComponent as Sheep } from '../../../assets/sheep.svg';
import * as styles from '../../../utils/styles';

const Section2 = () => {
  return (
    <div className="flex flex-col text-stone-700">
      <div className="xs:flex-col flex justify-end">
        <div className="xs:hidden sm:pr-2 sm:text-sm flex text-xl text-right items-end pr-7 pb-4">
          <p>
            整合你的思緒，擴展你的視野
            <br />
            不論是準備講道或小組分享
            <br />
            嗎哪罐子讓你更容易找到之前的筆記
          </p>
        </div>
        <div className="xs:w-full xs:pt-10 sm:pl-3 sm:text-3xl w-[45vw] text-6xl font-serif font-bold leading-relaxed border-l border-stone-500 pl-7 pt-52">
          以前的筆記,
          <br />
          找不到？
        </div>
      </div>
      <div className="xs:mt-5 lg:flex-col flex grow border-t border-stone-500 mt-20">
        <div className="lg:border-b border-stone-500 grow flex justify-center items-center bg-gradient-to-b from-stone-400 to-stone-300">
          <div>
            <video
              className="xs:mx-5 lg:w-[90%] lg:ml-8 w-[600px] mt-10 rounded drop-shadow-lg border border-stone-500"
              playsInline
              autoPlay
              muted
              loop
            >
              <source src={backLinks} type="video/mp4" />
            </video>
            <div className="sm:text-sm lg:mb-16 text-xl text-end mt-5 mr-5">
              只要簡單輸入#
              <br />
              就能建立筆記連結,方便查找
            </div>
          </div>
        </div>
        <div className="w-[45vw] lg:w-full flex flex-col border-l border-stone-500">
          <div className="flex justify-center gap-3 py-5 lg:py-16 bg-gradient-to-l hover:bg-gradient-to-r from-stone-400 to-stone-300 border-b border-stone-500">
            <div
              className={`${styles.limeCard} xs:h-40 xs:text-sm text-xl items-center h-60 w-[26%] border drop-shadow-lg border-stone-500`}
            >
              聚會崇拜
              <Sheep className="w-[60%]" />
            </div>
            <div
              className={`${styles.violetCard} xs:h-40 xs:text-sm text-xl items-center h-60 w-[26%] border drop-shadow-lg border-stone-500`}
            >
              個人靈修
              <Dove className="w-[60%]" />
            </div>
            <div
              className={`${styles.amberCard} xs:h-40 xs:text-sm text-xl items-center h-60 w-[26%] border drop-shadow-lg border-stone-500`}
            >
              分享收藏
              <Candle className="w-[40%]" />
            </div>
          </div>
          <div className="sm:h-48 sm:text-sm lg:h-72 flex justify-center h-96 text-xl mt-5">
            根據信仰生活的情境將筆記分類
            <br />
            並與家人朋友分享筆記
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
