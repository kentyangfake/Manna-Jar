import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectProfile, addNote } from '../../app/loginSlice';
import { Link, useSearchParams } from 'react-router-dom';
import { parseTime, parseWeekday } from '../../utils/utils';
import { firestore } from '../../utils/firebase';
import Header from './Header';

const Home = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const shareBy = searchParams.get('shareBy');
  const shareNoteId = searchParams.get('shareNote');

  useEffect(() => {
    if (!shareBy || !shareNoteId || shareBy === profile.id) {
      return;
    }
    const getShareNoteViaLink = async () => {
      const shareNote = await firestore.getShareNote(shareBy, shareNoteId);
      dispatch(addNote(shareNote));
    };

    getShareNoteViaLink();
  }, []);

  const notes = category
    ? [...profile.notes.filter((note) => note.category === category)]
    : profile.notes;

  return (
    <div>
      <Header />
      <Link to="/editor/newNote">新增筆記</Link>
      {notes.map((note) => (
        <Link key={note.id} to={`/note/${note.id}`}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '12px',
              textAlign: 'start',
              border: '1px solid red',
            }}
          >
            <p>{note.title}</p>
            <p>{note.category}</p>
            {profile.orderBy.record === 'edit' ? (
              <p>周{parseWeekday(note.edit_time)}</p>
            ) : (
              <p>周{parseWeekday(note.create_time)}</p>
            )}
            {profile.orderBy.record === 'edit' ? (
              <p>
                {note.category === 'shared' ? '收藏時間' : '編輯時間'}:
                {parseTime(note.edit_time)}
              </p>
            ) : (
              <p>建立時間:{parseTime(note.create_time)}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;
