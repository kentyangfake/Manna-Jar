import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { logoutAsync, selectProfile } from '../../app/loginSlice';
import { Counter } from '../../features/counter/Counter';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);

  return (
    <div>
      <p>welcom!{profile.name}</p>
      <button onClick={() => dispatch(logoutAsync())}>logout</button>
      <br />
      <Link to="/editor">新增筆記</Link>
      {profile.notes.map((note) => (
        <>
          <p>{note.id}</p>
          <div dangerouslySetInnerHTML={{ __html: note.content }}></div>
        </>
      ))}
      <Counter />
    </div>
  );
};

export default Home;
