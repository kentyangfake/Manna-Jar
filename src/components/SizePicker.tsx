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
}

const SizePicker = ({ edit, deleteInfo }: Props) => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const navigate = useNavigate();
  return (
    <div className="flex h-8 border-y bg-stone-500 border-stone-500">
      <div
        className={`w-32 border-r text-sm font-serif font-black rounded-e-full ${
          profile.fontSize === 'small'
            ? styles.themeButtonActive
            : styles.themeButton
        }`}
        onClick={() => dispatch(changeDisplayFontSize('small'))}
      >
        Aa
      </div>
      <div
        className={`w-32 border-x text-lg font-serif font-bold rounded-full ${
          profile.fontSize === 'medium'
            ? styles.themeButtonActive
            : styles.themeButton
        }`}
        onClick={() => dispatch(changeDisplayFontSize('medium'))}
      >
        Aa
      </div>
      <div
        className={`w-32 border-x text-2xl font-serif font-bold rounded-full ${
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
          className={`${styles.themeButton} w-20 border-l`}
        >
          編
        </Link>
      )}
      {deleteInfo && (
        <div
          className={`${styles.themeButton} w-20 border-l`}
          onClick={() => {
            const isDelete = window.confirm('確認要刪除嗎?');
            if (isDelete) {
              dispatch(deleteNote(deleteInfo.id!));
              window.alert(`已刪除筆記:${deleteInfo.title}`);
              navigate('/');
            }
          }}
        >
          刪
        </div>
      )}
    </div>
  );
};

export default SizePicker;
