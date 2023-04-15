import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectProfile, deleteNote } from '../../app/loginSlice';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { NoteType } from '../../app/types';
import NetworkGraph from '../../components/NetworkGraph';
import { parseTime } from '../../utils/utils';
import SizePicker from '../../components/SizePicker';

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <SizePicker />
      <div>{currentNote.title}</div>
      {currentNote.sharedBy ? <div>由 {currentNote.sharedBy} 分享</div> : ''}
      {currentNote.create_time > 1 ? (
        <p>建立時間:{parseTime(currentNote.create_time)}</p>
      ) : (
        ''
      )}
      {currentNote.edit_time > 1 ? (
        <p>
          {currentNote.category === 'shared' ? '收藏時間' : '編輯時間'}:
          {parseTime(currentNote.edit_time)}
        </p>
      ) : (
        ''
      )}
      {currentNote.category === 'shared' || currentNote.category === 'admin' ? (
        ''
      ) : (
        <Link to={`/editor/${id}`} style={{ border: '1px solid gray' }}>
          編輯筆記
        </Link>
      )}
      <div
        style={{ fontSize }}
        dangerouslySetInnerHTML={{ __html: currentNote.content }}
      ></div>
      {referenced.length > 0 ? <div>Referenced by:</div> : ''}
      {referenced?.map((note) => (
        <Link to={`/note/${note.linkId}`} key={note.linkId}>
          {note.linkTitle}
        </Link>
      ))}
      <div
        style={{ width: '300px', height: '300px', border: '1px solid black' }}
      >
        <NetworkGraph />
      </div>
      {currentNote.category === 'shared' || currentNote.category === 'admin' ? (
        ''
      ) : (
        <div>
          分享連結: https://manna-jar.web.app/?category=shared&shareBy=
          {profile.id}&shareNote=
          {currentNote.id}
        </div>
      )}
      {currentNote.category === 'admin' ? (
        ''
      ) : (
        <div
          style={{ border: '1px solid gray', cursor: 'pointer' }}
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
  );
};

export default Note;
