import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { deleteNote } from '../redux/userSlice';
import { SuccessSwal, WarningSwal } from '../utils/CustomSwal';
import * as styles from '../utils/styles';
import Helper from './toolBar/Helper';
import SizePicker from './toolBar/SizePicker';

interface Props {
  edit?: string;
  deleteInfo?: { id: string; title: string };
  previous?: boolean;
  fullGraph?: boolean;
}

const ToolBar = ({ edit, deleteInfo, previous, fullGraph }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [toggleFontSize, setToggleFontSize] = useState(false);
  const [toggleHelp, settoggleHelp] = useState(false);

  return (
    <div className="flex h-8 border-b bg-stone-500 border-stone-500">
      {previous && (
        <div
          className={`lg:w-[104px] lg:rounded-none ${styles.themeButton} w-32 border-r rounded-br-full font-bold hover:border-b-2 hover:border-l`}
          onClick={() => navigate(-1)}
        >
          ←
        </div>
      )}
      <div
        className={`lg:rounded-none ${styles.theme} ${
          previous && 'rounded-bl-full'
        } grow`}
      ></div>
      {edit && (
        <Link
          to={`/editor/${edit}`}
          className={`lg:w-16 ${styles.themeButton} w-20 border-l border-b-2 hover:border-b-4 hover:border-l-2`}
        >
          <span className="material-symbols-outlined text-lg">edit</span>
        </Link>
      )}
      {deleteInfo && (
        <div
          className={`lg:w-16 ${styles.themeButton} w-20 border-l border-b-2 hover:border-b-4 hover:border-l-2`}
          onClick={() => {
            WarningSwal.fire({
              title: '刪除筆記',
              text: `確定要刪除 ${deleteInfo.title} 嗎?`,
              confirmButtonText: '刪了吧!',
              cancelButtonText: '取消',
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(deleteNote(deleteInfo.id!));
                SuccessSwal.fire({
                  title: '已刪除',
                  text: `刪除筆記: ${deleteInfo.title}`,
                });
                navigate('/');
              }
            });
          }}
        >
          <span className="material-symbols-outlined text-lg">delete</span>
        </div>
      )}
      <SizePicker
        toggleFontSize={toggleFontSize}
        setToggleFontSize={setToggleFontSize}
        settoggleHelp={settoggleHelp}
      />
      <Helper
        fullGraph={fullGraph}
        toggleHelp={toggleHelp}
        setToggleFontSize={setToggleFontSize}
        settoggleHelp={settoggleHelp}
      />
    </div>
  );
};

export default ToolBar;
