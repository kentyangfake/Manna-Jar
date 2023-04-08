import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectProfile } from '../../app/loginSlice';
import { Link, useSearchParams } from 'react-router-dom';

const Home = () => {
  const profile = useAppSelector(selectProfile);
  //TODO:展示分類
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';

  return (
    <div>
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
    </div>
  );
};

export default Home;
