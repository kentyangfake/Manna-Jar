import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  selectProfile,
  changeDisplayFontSize,
  deleteNote,
} from '../app/loginSlice';
import { useNavigate, Link } from 'react-router-dom';
import * as styles from '../utils/styles';

interface Props {
  edit?: string;
  deleteInfo?: { id: string; title: string };
  previous?: boolean;
}

const SizePicker = ({ edit, deleteInfo, previous }: Props) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const navigate = useNavigate();
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
      <div
        className={`border-r text-sm font-serif font-black ${
          previous ? 'w-20 rounded-full' : 'w-32 rounded-e-full'
        } ${
          profile.fontSize === 'small'
            ? styles.themeButtonActive
            : styles.themeButton
        }`}
        onClick={() => dispatch(changeDisplayFontSize('small'))}
      >
        Aa
      </div>
      <div
        className={`w-20 border-x text-lg font-serif font-bold rounded-full ${
          profile.fontSize === 'medium'
            ? styles.themeButtonActive
            : styles.themeButton
        }`}
        onClick={() => dispatch(changeDisplayFontSize('medium'))}
      >
        Aa
      </div>
      <div
        className={`w-20 border-x text-2xl font-serif font-bold rounded-full ${
          profile.fontSize === 'large'
            ? styles.themeButtonActive
            : styles.themeButton
        }`}
        onClick={() => dispatch(changeDisplayFontSize('large'))}
      >
        Aa
      </div>
      <div className={`${styles.theme} grow border-l rounded-s-full`}></div>
      {edit && (
        <Link
          to={`/editor/${edit}`}
          className={`${styles.themeButton} w-20 border-l border-b-2 hover:border-b-4 hover:border-l-2`}
        >
          ✎
        </Link>
      )}
      {deleteInfo && (
        <div
          className={`${styles.themeButton} w-20 border-l border-b-2 hover:border-b-4 hover:border-l-2`}
          onClick={() => {
            const isDelete = window.confirm('確認要刪除嗎?');
            if (isDelete) {
              dispatch(deleteNote(deleteInfo.id!));
              window.alert(`已刪除筆記:${deleteInfo.title}`);
              navigate('/');
            }
          }}
        >
          ✕
        </div>
      )}
    </div>
  );
};

export default SizePicker;
