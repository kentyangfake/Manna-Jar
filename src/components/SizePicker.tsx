import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  selectProfile,
  changeDisplayFontSize,
  deleteNote,
} from '../app/loginSlice';
import { useNavigate, Link } from 'react-router-dom';
import * as styles from '../utils/styles';
import Swal from 'sweetalert2';

interface Props {
  edit?: string;
  deleteInfo?: { id: string; title: string };
  previous?: boolean;
  fullGraph?: boolean;
}

const SizePicker = ({ edit, deleteInfo, previous, fullGraph }: Props) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const navigate = useNavigate();
  const [toggleFontSize, setToggleFontSize] = useState(false);
  const [toggleHelp, settoggleHelp] = useState(false);
  return (
    <div className="flex h-8 border-y bg-stone-500 border-stone-500">
      {previous && (
        <div
          className={`w-32 border-r font-bold rounded-e-full ${styles.themeButton}`}
          onClick={() => navigate(-1)}
        >
          ←
        </div>
      )}
      <div className={`${styles.theme} grow border-l rounded-s-full`}></div>
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
              showCancelButton: true,
              confirmButtonColor: '#f87171',
              cancelButtonColor: '#d6d3d1',
              confirmButtonText: '刪了吧!',
              cancelButtonText: '取消',
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(deleteNote(deleteInfo.id!));
                Swal.fire('已刪除', `刪除筆記: ${deleteInfo.title}`, 'success');
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
            className={`${styles.themeButtonNoBg} ${
              profile.fontSize === 'small' && 'bg-stone-200'
            } grow h-full rounded-l-3xl text-2xl font-serif font-bold`}
            onClick={() => dispatch(changeDisplayFontSize('small'))}
          >
            S
          </div>
          <div
            className={`${styles.themeButtonNoBg} ${
              profile.fontSize === 'medium' && 'bg-stone-200'
            } grow border-l h-full text-2xl font-serif font-bold`}
            onClick={() => dispatch(changeDisplayFontSize('medium'))}
          >
            M
          </div>
          <div
            className={`${styles.themeButtonNoBg} ${
              profile.fontSize === 'large' && 'bg-stone-200'
            } grow border-l h-full rounded-br-3xl text-2xl font-serif font-bold`}
            onClick={() => dispatch(changeDisplayFontSize('large'))}
          >
            L
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
            } border absolute z-30 -right-[1px] top-[30px] p-4 h-80 w-60 rounded-b-3xl rounded-tl-3xl drop-shadow-xl`}
          >
            介紹連結圖和筆記連結可點擊/複製分享連結
          </div>
        </div>
      )}
      {fullGraph && (
        <>
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
              } border absolute z-30 -right-[1px] top-[30px] p-4 h-80 w-60 rounded-b-3xl rounded-tl-3xl drop-shadow-xl`}
            >
              介紹graphview跟ai回顧
            </div>
          </div>
          <div className={`${styles.theme} w-7 border-l`}></div>
        </>
      )}
    </div>
  );
};

export default SizePicker;
