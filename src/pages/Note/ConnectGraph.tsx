import { useState } from 'react';
import { useParams } from 'react-router-dom';
import NetworkGraph from '../../components/NetworkGraph';
import Header from '../../components/header';
import { useAppSelector } from '../../redux/hooks';
import { NoteType } from '../../redux/types';
import { selectFontSize, selectProfile } from '../../redux/userSlice';
import * as styles from '../../utils/styles';

interface Props {
  shareLink: string;
  currentNote: NoteType;
}

const ConnectGraph = ({ shareLink, currentNote }: Props) => {
  const { id } = useParams();
  const profile = useAppSelector(selectProfile);
  const fontSizeNum = useAppSelector(selectFontSize);
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div
      className={`${styles.theme} fixed overflow-scroll top-0 right-0 flex flex-col justify-between h-full w-72 border-l`}
    >
      <Header text={'連結圖'} />
      <div className="w-full h-[50vh] texture2 border-b border-stone-500">
        <NetworkGraph
          filtBy={'all'}
          id={id}
          fontSizeNum={fontSizeNum}
          userNotes={profile.notes}
        />
      </div>
      {(currentNote.category === 'sermon' ||
        currentNote.category === 'devotion') && (
        <div className="flex flex-col p-4 mt-[5vh]">
          <input
            className={`grow truncate h-10 border-x border-t border-stone-400 focus:outline-none font-extralight pl-2 ${
              isCopied ? 'bg-stone-100' : 'bg-stone-200'
            }`}
            value={shareLink}
            readOnly
          />
          <label
            className={`flex justify-center items-center h-10 border cursor-pointer border-stone-400 hover:bg-stone-200 ${
              isCopied ? 'bg-stone-200' : 'bg-stone-300'
            }`}
            onClick={() => {
              navigator.clipboard.writeText(shareLink);
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 500);
            }}
          >
            {isCopied ? (
              <>
                <span className="material-symbols-outlined">done</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined pr-2 text-base">
                  file_copy
                </span>
                一鍵複製
              </>
            )}
          </label>
          <label className="mt-2 text-xs">
            ※對方登入後即可透過此連結收藏筆記
          </label>
        </div>
      )}
      <div className="mt-auto mb-4 flex w-full justify-center text-xs font-thin text-stone-900">
        Powered by † MannaJar
      </div>
    </div>
  );
};

export default ConnectGraph;
