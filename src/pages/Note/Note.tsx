import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectProfile, deleteNote } from '../../app/loginSlice';
import { useNavigate, useParams, Link } from 'react-router-dom';
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
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
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
        <SizePicker />
        {/* {currentNote.sharedBy && <div>由 {currentNote.sharedBy} 分享</div>}
        {currentNote.create_time > 1 && (
          <p>
            建立時間:
            {`${parseDate(currentNote.create_time)}, ${parseTime(
              currentNote.create_time
            )}`}
          </p>
        )}
        {currentNote.edit_time > 1 && (
          <p>
            {currentNote.category === 'shared' ? '收藏時間' : '編輯時間'}:
            {`${parseDate(currentNote.edit_time)}, ${parseTime(
              currentNote.edit_time
            )}`}
          </p>
        )} */}
        {currentNote.category === 'shared' ||
        currentNote.category === 'admin' ? (
          ''
        ) : (
          <Link
            to={`/editor/${id}`}
            className={`${styles.themeButton} w-32 border`}
          >
            編輯筆記
          </Link>
        )}
        <div
          style={{ fontSize }}
          className="flex flex-wrap w-full"
          dangerouslySetInnerHTML={{ __html: currentNote.content }}
        ></div>

        {currentNote.category === 'admin' ? (
          ''
        ) : (
          <div
            className={`${styles.themeButton} w-32 border`}
            onClick={() => {
              const isDelete = window.confirm('確認要刪除嗎?');
              if (isDelete) {
                dispatch(deleteNote(id!));
                window.alert(`已刪除筆記:${currentNote.title}`);
                navigate('/');
              }
            }}
          >
            刪除筆記
          </div>
        )}
      </div>
      <div
        className={`${styles.theme} fixed top-0 right-0 flex flex-col h-full w-[350px] border`}
      >
        <Header text={'連結圖'} />
        <div className="w-full h-96 bg-white border-t border-stone-500">
          <NetworkGraph filtBy={'all'} />
        </div>
        <div className="flex flex-col p-4">
          {referenced.length > 0 && <div>引用列表:</div>}
          {referenced?.map((note) => (
            <Link to={`/note/${note.linkId}`} key={note.linkId}>
              {note.linkTitle}
            </Link>
          ))}
          {currentNote.category === 'shared' ||
          currentNote.category === 'admin' ? (
            ''
          ) : (
            <div className="flex">
              <label>分享連結:</label>
              <input
                className="grow"
                value={`https://manna-jar.web.app/?category=shared&shareBy=${profile.id}&shareNote=${currentNote.id}`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Note;
