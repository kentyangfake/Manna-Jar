import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectProfile } from '../../app/loginSlice';
import { Counter } from '../../features/counter/Counter';
import { Link } from 'react-router-dom';
import Navigate from '../../components/Navigate';

const Home = () => {
  const profile = useAppSelector(selectProfile);

  return (
    <div>
      <Navigate />
      <br />
      <Link to="/editor">新增筆記</Link>
      {profile.notes.map((note) => (
        <div
          key={note.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: '12px',
            textAlign: 'start',
            border: '1px solid red',
          }}
        >
          <p>{note.title}</p>
          <div dangerouslySetInnerHTML={{ __html: note.content }}></div>
        </div>
      ))}
      <Counter />
    </div>
  );
};

export default Home;
