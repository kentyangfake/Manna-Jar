import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
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

  let fontSize = 20;
  switch (profile.fontSize) {
    case 'small':
      fontSize = 20;
      break;
    case 'medium':
      fontSize = 24;
      break;
    case 'large':
      fontSize = 28;
      break;
    default:
      fontSize = 20;
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
    <div className="flex w-full h-full min-h-screen tracking-widest overflow-x-hidden bg-stone-300 text-stone-500">
      <div
        className={`${styles.theme} flex flex-col grow border border-r-0 mr-[350px]`}
      >
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
        <div
          style={{ fontSize }}
          className="flex flex-wrap w-full p-4"
          dangerouslySetInnerHTML={{ __html: currentNote.content }}
        ></div>
        <div className="flex flex-col p-4">
          {referenced.length > 0 && <div>引用列表:</div>}
          {referenced?.map((note) => (
            <Link to={`/note/${note.linkId}`} key={note.linkId}>
              {note.linkTitle}
            </Link>
          ))}
        </div>
      </div>
      <div
        className={`${styles.theme} fixed top-0 right-0 flex flex-col h-full w-[350px] border`}
      >
        <Header text={'連結圖'} />
        <div className="w-full h-96 bg-white border-t border-stone-500">
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
