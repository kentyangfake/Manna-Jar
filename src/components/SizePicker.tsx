import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import connection from '../assets/connection.png';
import link from '../assets/link.png';
import referencedBy from '../assets/referencedBy.png';
import shareButton from '../assets/shareButton.png';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  decrementFontSize,
  deleteNote,
  incrementFontSize,
  selectFontSize,
} from '../redux/loginSlice';
import * as styles from '../utils/styles';
import { parseDisplayFontSize, parseHelperFontSize } from '../utils/utils';

interface Props {
  edit?: string;
  deleteInfo?: { id: string; title: string };
  previous?: boolean;
  fullGraph?: boolean;
}

const SizePicker = ({ edit, deleteInfo, previous, fullGraph }: Props) => {
  const dispatch = useAppDispatch();
  const fontSizeNum = useAppSelector(selectFontSize);
  const fontSize = parseDisplayFontSize(fontSizeNum);
  const helperFontSize = parseHelperFontSize(fontSizeNum);
  const navigate = useNavigate();
  const [toggleFontSize, setToggleFontSize] = useState(false);
  const [toggleHelp, settoggleHelp] = useState(false);

  return (
    <div className="flex h-8 border-b bg-stone-500 border-stone-500">
      {previous && (
        <div
          className={`${styles.themeButton} w-32 border-r rounded-br-full font-bold hover:border-b-2 hover:border-l`}
          onClick={() => navigate(-1)}
        >
          ←
        </div>
      )}
      <div
        className={`${styles.theme} ${previous && 'rounded-bl-full'} grow`}
      ></div>
      {edit && (
        <Link
          to={`/editor/${edit}`}
          className={`${styles.themeButton} w-20 border-l border-b-2 hover:border-b-4 hover:border-l-2`}
        >
          <span className="material-symbols-outlined text-lg">edit</span>
        </Link>
      )}
      {deleteInfo && (
        <div
          className={`${styles.themeButton} w-20 border-l border-b-2 hover:border-b-4 hover:border-l-2`}
          onClick={() => {
            Swal.fire({
              title: '刪除筆記',
              text: `確定要刪除 ${deleteInfo.title} 嗎?`,
              icon: 'question',
              background: '#f5f5f4',
              showCancelButton: true,
              confirmButtonColor: '#f87171',
              cancelButtonColor: '#d6d3d1',
              confirmButtonText: '刪了吧!',
              cancelButtonText: '取消',
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(deleteNote(deleteInfo.id!));
                Swal.fire({
                  title: '已刪除',
                  text: `刪除筆記: ${deleteInfo.title}`,
                  icon: 'success',
                  background: '#f5f5f4',
                });
                navigate('/');
              }
            });
          }}
        >
          <span className="material-symbols-outlined text-lg">delete</span>
        </div>
      )}
      {/* fontsize */}
      <div
        className={`relative ${styles.themeFlex} w-20 border-l ${
          toggleFontSize
            ? 'borde-b-0 bg-stone-100 hover:border-b-0'
            : 'border-b-2 hover:border-b-4 hover:border-l-2 bg-stone-300 hover:bg-stone-200'
        }`}
      >
        <span
          className="cursor-pointer grow text-center text-lg font-serif font-bold"
          onClick={() => {
            setToggleFontSize((prev) => !prev);
            settoggleHelp(false);
          }}
        >
          Aa
        </span>
        <div
          className={`${toggleFontSize ? 'flex' : 'hidden'} ${
            styles.theme
          } absolute z-30 -right-[1px] top-[30px] h-16 w-[248px] justify-center items-center rounded-b-3xl rounded-tl-3xl drop-shadow-xl border bg-stone-300`}
        >
          <div
            className={`${styles.themeButtonNoBg} grow h-full rounded-l-3xl text-2xl font-serif font-bold`}
            onClick={() => dispatch(decrementFontSize())}
          >
            <span className="material-symbols-outlined">text_decrease</span>
          </div>
          <div
            className={`${styles.theme} flex justify-center items-center w-[87px] border-l h-full font-serif text-2xl font-bold`}
          >
            {fontSize}
          </div>
          <div
            className={`${styles.themeButtonNoBg} grow border-l h-full rounded-br-3xl text-2xl font-serif font-bold`}
            onClick={() => dispatch(incrementFontSize())}
          >
            <span className="material-symbols-outlined">text_increase</span>
          </div>
        </div>
      </div>
      {/* help */}
      {!fullGraph && (
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
      )}
      {fullGraph && (
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
      )}
    </div>
  );
};

export default SizePicker;
