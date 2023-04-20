import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectProfile } from '../../app/loginSlice';
import { useParams, Link } from 'react-router-dom';
import { NoteType } from '../../app/types';
import NetworkGraph from '../../components/NetworkGraph';
import Header from '../../components/header';
import SizePicker from '../../components/SizePicker';
import * as styles from '../../utils/styles';

interface Referenced {
  linkTitle: string;
  linkId: string;
}

const Note = () => {
  const profile = useAppSelector(selectProfile);
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

  let fontSize = 'text-base';
  switch (profile.fontSize) {
    case 'small':
      fontSize = 'text-base';
      break;
    case 'medium':
      fontSize = 'text-lg';
      break;
    case 'large':
      fontSize = 'text-xl';
      break;
    default:
      fontSize = 'text-base';
  }

  useEffect(() => {
    if (profile.notes.length === 0) {
      return;
    }

    const matchNote = profile.notes.find((note) => note.id === id);
    if (matchNote) {
      setCurrentNote(matchNote);
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
          <SizePicker />
        ) : currentNote.category === 'shared' ? (
          <SizePicker
            deleteInfo={{ id: currentNote.id, title: currentNote.title }}
          />
        ) : (
          <SizePicker
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
          } sticky top-0 w-96 h-96`}
        >
          <div className="w-96 h-96 bg-stone-100 rounded-tl-full"></div>
        </div>
        <div
          className={`${fontSize} z-10 flex flex-col flex-wrap leading-loose text-stone-600 w-full ml-12 mt-[-350px] pb-6 mb-12`}
          dangerouslySetInnerHTML={{ __html: currentNote.content }}
        ></div>
        <div className=" z-10 flex flex-col ml-12 py-6 border-t border-stone-400">
          {referenced.length > 0 && (
            <div className="text-stone-400">引用列表:</div>
          )}
          {referenced?.map((note) => (
            <Link
              to={`/note/${note.linkId}`}
              key={note.linkId}
              className={'w-fit leading-8'}
            >
              {note.linkTitle}
            </Link>
          ))}
        </div>
      </div>
      <div
        className={`${styles.theme} fixed top-0 right-0 flex flex-col h-full w-72 border-l`}
      >
        <Header text={'連結圖'} />
        <div className="w-full h-96 bg-stone-200 border-t border-stone-500">
          <NetworkGraph filtBy={'all'} />
        </div>

        {(currentNote.category === 'sermon' ||
          currentNote.category === 'devotion') && (
          <div className="flex p-4">
            <label>分享連結:</label>
            <input
              className="grow"
              value={`https://manna-jar.web.app/?category=shared&shareBy=${profile.id}&shareNote=${currentNote.id}`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Note;
