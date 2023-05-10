import Swal from 'sweetalert2';
import connection from '../../assets/connection.png';
import link from '../../assets/link.png';
import referencedBy from '../../assets/referencedBy.png';
import shareButton from '../../assets/shareButton.png';
import { useAppSelector } from '../../redux/hooks';
import { selectFontSize } from '../../redux/userSlice';
import * as styles from '../../utils/styles';
import { parseHelperFontSize } from '../../utils/utils';

interface Props {
  fullGraph?: boolean;
  toggleHelp: boolean;
  setToggleFontSize: React.Dispatch<React.SetStateAction<boolean>>;
  settoggleHelp: React.Dispatch<React.SetStateAction<boolean>>;
}

const Helper = ({
  fullGraph,
  toggleHelp,
  setToggleFontSize,
  settoggleHelp,
}: Props) => {
  const fontSizeNum = useAppSelector(selectFontSize);
  const helperFontSize = parseHelperFontSize(fontSizeNum);
  return fullGraph ? (
    <>
      <div
        className={`relative ${
          styles.themeFlex
        } ${helperFontSize} w-20 border-l ${
          toggleHelp
            ? 'borde-b-0 bg-stone-100 hover:border-b-0'
            : 'border-b-2 hover:border-b-4 hover:border-l-2 bg-stone-300 hover:bg-stone-200'
        }`}
      >
        <span
          className="cursor-pointer material-symbols-outlined text-lg grow text-center"
          onClick={() => {
            settoggleHelp((prev) => !prev);
            setToggleFontSize(false);
          }}
        >
          help
        </span>
        <div
          className={`${toggleHelp ? 'flex' : 'hidden'} ${
            styles.theme
          } overflow-y-auto flex-col border absolute z-30 -right-[1px] top-[30px] p-4 h-80 w-72 rounded-b-3xl rounded-tl-3xl drop-shadow-xl`}
        >
          <div className="mb-3 font-semibold">我的罐子</div>
          <span>
            在這裡會展示所有的筆記，可以一覽無遺信仰的累積，獲得能量並尋找靈感。可依筆記分類篩選展示結果。點擊圓點圖示可前往對應的筆記頁面。
          </span>
          <div className="mt-5 mb-3 font-semibold">AI回顧</div>
          <span>
            AI會幫您回顧最近的筆記內容，並推薦可能有關聯的筆記供您複習。如果這些筆記內容彼此呼應，別忘了幫這些筆記建立連結唷！(此功能在您累積一定數量的筆記後解鎖)
          </span>
        </div>
      </div>
      <div className={`${styles.theme} w-7 border-l`}></div>
    </>
  ) : (
    <div
      className={`relative ${styles.themeFlex} w-20 border-l ${
        toggleHelp
          ? 'borde-b-0 bg-stone-100 hover:border-b-0'
          : 'border-b-2 hover:border-b-4 hover:border-l-2 bg-stone-300 hover:bg-stone-200'
      }`}
    >
      <span
        className="cursor-pointer material-symbols-outlined text-lg grow text-center"
        onClick={() => {
          settoggleHelp((prev) => !prev);
          setToggleFontSize(false);
        }}
      >
        help
      </span>
      <div
        className={`${toggleHelp ? 'flex' : 'hidden'} ${
          styles.theme
        } ${helperFontSize} flex-col overflow-y-auto border absolute z-30 -right-[1px] top-[30px] p-4 h-80 w-72 rounded-b-3xl rounded-tl-3xl drop-shadow-xl`}
      >
        <div className="mb-3 font-semibold">筆記關聯</div>
        <span>
          若筆記有引用其他筆記，可透過點擊文章內的
          <span
            className="cursor-pointer text-violet-400"
            onClick={() =>
              Swal.fire({
                imageUrl: link,
                imageHeight: 100,
                imageAlt: 'linkImg',
                showConfirmButton: false,
                background: 'rgba(255,255,255,0)',
              })
            }
          >
            筆記連結
          </span>
          前往該筆記頁面，若當前筆記有被其他筆記引用，可透過文末的
          <span
            className="cursor-pointer text-violet-400"
            onClick={() =>
              Swal.fire({
                imageUrl: referencedBy,
                imageHeight: 150,
                imageAlt: 'referencedByImg',
                showConfirmButton: false,
                background: 'rgba(255,255,255,0)',
              })
            }
          >
            引用列表
          </span>
          查看。已建立連結的筆記皆會顯示在右側
          <span
            className="cursor-pointer text-violet-400"
            onClick={() =>
              Swal.fire({
                imageUrl: connection,
                imageHeight: 500,
                imageAlt: 'connectionImg',
                showConfirmButton: false,
                background: 'rgba(255,255,255,0)',
              })
            }
          >
            連結圖
          </span>
          內，可點擊圓點圖示前往該筆記。
        </span>
        <div className="mt-5 mb-3 font-semibold">分享筆記</div>
        <span>
          複製連結圖下方的
          <span
            className="cursor-pointer text-violet-400"
            onClick={() =>
              Swal.fire({
                imageUrl: shareButton,
                imageHeight: 100,
                imageAlt: 'shareButtonImg',
                showConfirmButton: false,
                background: 'rgba(255,255,255,0)',
              })
            }
          >
            分享網址
          </span>
          後，透過您常用的通訊軟體，即可將自己撰寫的筆記分享給其他嗎哪罐子使用者。
          <div className="mt-5 mb-3 font-semibold">收藏筆記</div>
          使用者登入嗎哪罐子後，只要在通訊軟體裡<i>點擊分享連結</i>
          ，即可收藏該篇筆記。
        </span>
      </div>
    </div>
  );
};

export default Helper;
