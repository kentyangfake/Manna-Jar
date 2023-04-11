import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectProfile } from '../../app/loginSlice';
import { Link, useSearchParams } from 'react-router-dom';
import { parseTime, parseWeek } from '../../utils/utils';
import Header from './Header';

const Home = () => {
  const profile = useAppSelector(selectProfile);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
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
              <p>周{parseWeek(note.edit_time)}</p>
            ) : (
              <p>周{parseWeek(note.create_time)}</p>
            )}
            {profile.orderBy.record === 'edit' ? (
              <p>編輯時間: {parseTime(note.edit_time)}</p>
            ) : (
              <p>建立時間: {parseTime(note.create_time)}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;
