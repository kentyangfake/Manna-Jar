import { useState, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectProfile, selectFontSize } from '../../app/loginSlice';
import { useParams, Link } from 'react-router-dom';
import { NoteType } from '../../app/types';
import NetworkGraph from '../../components/NetworkGraph';
import Header from '../../components/header';
import SizePicker from '../../components/SizePicker';
import * as styles from '../../utils/styles';
import Swal from 'sweetalert2';
import { parseFontSize } from '../../utils/utils';

interface Referenced {
  linkTitle: string;
  linkId: string;
}

const Note = () => {
  const profile = useAppSelector(selectProfile);
  const fontSizeNum = useAppSelector(selectFontSize);
  const fontSize = parseFontSize(fontSizeNum);
  const { id } = useParams();
  const [currentNote, setCurrentNote] = useState<NoteType>({
    id: '',
    title: '',
    content: '',
    category: '',
    link_notes: [],
    create_time: 1,
    edit_time: 1,
  });
  const [referenced, setReferenced] = useState<Referenced[]>([]);
  const [shareLink, setShareLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (profile.notes.length === 0) {
      return;
    }

    const matchNote = profile.notes.find((note) => note.id === id);
    if (matchNote) {
      setCurrentNote(matchNote);
      setShareLink(
        `https://manna-jar.web.app/?category=shared&shareBy=${profile.id}&shareNote=${matchNote.id}`
      );
    } else {
      setCurrentNote({
        id: '',
        title: '找不到這篇筆記',
        content: '筆記可能被刪除,或向分享者索取該筆記',
        category: 'admin',
        link_notes: [],
        create_time: 1,
        edit_time: 1,
      });
      Swal.fire({
        icon: 'warning',
        title: '找不到這篇筆記',
        text: '筆記可能被刪除,或向分享者索取該筆記',
        background: '#f5f5f4',
      });
    }

    const referencedBy: Referenced[] = [];
    profile.notes.map((note) =>
      note.link_notes?.map((link) => {
        if (link.id === id) {
          referencedBy.push({ linkTitle: note.title, linkId: note.id });
        }
      })
    );
    setReferenced(referencedBy);
  }, [profile, id]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col w-full pr-72 tracking-widest bg-stone-300 text-stone-500">
        <Header
          text={currentNote.title}
          underline
          createTime={currentNote.create_time}
          editTime={currentNote.edit_time}
          sharedBy={currentNote.sharedBy}
        />
        {currentNote.category === 'admin' ? (
          <SizePicker previous />
        ) : currentNote.category === 'shared' ? (
          <SizePicker
            previous
            deleteInfo={{ id: currentNote.id, title: currentNote.title }}
          />
        ) : (
          <SizePicker
            previous
            edit={currentNote.id}
            deleteInfo={{ id: currentNote.id, title: currentNote.title }}
          />
        )}
      </div>
      <div
        className={`relative z-0 flex flex-col w-full grow pr-96 tracking-wider bg-stone-100`}
      >
        <div
          className={`${
            currentNote.category === 'sermon'
              ? 'bg-lime-100'
              : currentNote.category === 'devotion'
              ? 'bg-violet-100'
              : currentNote.category === 'shared'
              ? 'bg-amber-100'
              : 'bg-stone-100'
          } sticky top-0 w-72 h-72`}
        >
          <div className="w-72 h-72 bg-stone-100 rounded-tl-full"></div>
        </div>
        {/* 這裡使用字體大小 */}
        <div
          className={`${fontSize} z-10 flex flex-col flex-wrap leading-loose text-stone-600 ml-12 mt-[-250px] pb-6 mb-12 selection:bg-fuchsia-300 selection:text-fuchsia-900`}
          dangerouslySetInnerHTML={{ __html: currentNote.content }}
        ></div>
        <div
          className={`${fontSize} z-10 flex flex-col ml-12 py-6 border-t border-stone-400`}
        >
          {referenced.length > 0 && (
            <div className="text-stone-400">引用列表</div>
          )}
          {referenced?.map((note) => (
            <Link
              to={`/note/${note.linkId}`}
              key={note.linkId}
              className={'w-fit leading-relaxed'}
            >
              {note.linkTitle}
            </Link>
          ))}
        </div>
      </div>
      <div
        className={`${styles.theme} fixed top-0 right-0 flex flex-col justify-between h-full w-72 border-l`}
      >
        <Header text={'連結圖'} />
        <div className="w-full h-96 texture2 border-b border-stone-500">
          <NetworkGraph
            filtBy={'all'}
            id={id}
            fontSizeNum={fontSizeNum}
            userNotes={profile.notes}
          />
        </div>
        {(currentNote.category === 'sermon' ||
          currentNote.category === 'devotion') && (
          <div className="flex flex-col p-4 mt-1">
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
    </div>
  );
};

export default Note;
