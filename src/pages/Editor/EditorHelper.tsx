import { useState } from 'react';
import autoVerse from '../../assets/autoVerse.gif';
import backLinks from '../../assets/backLinks.gif';
import { HelperSwal } from '../../utils/CustomSwal';
import * as styles from '../../utils/styles';

const EditorHelper = () => {
  const [toggleHelp, settoggleHelp] = useState(false);
  return (
    <div
      className={`relative ${styles.themeFlex} w-20 border-l border-y ${
        toggleHelp
          ? 'bg-stone-100'
          : 'bg-stone-300 border-b-2 hover:bg-stone-200 hover:border-b-4 hover:border-l-2'
      }`}
    >
      <span
        className="cursor-pointer material-symbols-outlined text-lg grow text-center"
        onClick={() => {
          settoggleHelp((prev) => !prev);
        }}
      >
        help
      </span>
      <div
        className={`${toggleHelp ? 'flex' : 'hidden'} ${
          styles.theme
        } text-lg overflow-y-auto flex-col border absolute z-10 right-0 bottom-[38px] h-80 w-72 p-4 rounded-t-3xl rounded-bl-3xl drop-shadow-xl`}
      >
        <div className="mb-3 font-semibold">自動經文輸入</div>
        <span>
          可以透過
          <span
            className="cursor-pointer text-violet-400"
            onClick={() =>
              HelperSwal.fire({
                imageUrl: autoVerse,
                imageWidth: 1000,
                imageAlt: 'autoVerseImg',
              })
            }
          >
            經文輸入
          </span>
          功能自動輸入經文，只要簡單輸入書卷名稱，章節和經節(
          <i>例:出埃及記16:4</i>
          )，再按下<i>空白鍵</i>
          ，經文就會自動出現。此功能支援書卷簡稱，詳細書卷簡稱可至
          <i>教學筆記</i>查看。
        </span>
        <div className="mt-5 mb-3 font-semibold">建立連結</div>
        <span>
          可以透過輸入<i>#</i>後，選取<i>筆記標題</i>
          (亦可接著輸入搜尋文字)來建立
          <span
            className="cursor-pointer text-violet-400"
            onClick={() =>
              HelperSwal.fire({
                imageUrl: backLinks,
                imageWidth: 1000,
                imageAlt: 'backLinksImg',
              })
            }
          >
            筆記連結
          </span>
          ，建立連結後會自動在對應筆記的引用列表新增當前筆記。
        </span>
      </div>
    </div>
  );
};

export default EditorHelper;
