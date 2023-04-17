import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectProfile, addNote } from '../../app/loginSlice';
import { Link, useSearchParams } from 'react-router-dom';
import { parseTime, parseWeekday } from '../../utils/utils';
import { firestore } from '../../utils/firebase';
import OrderPicker from './OrderPicker';

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
    <div className="w-full h-full bg-stone-300 text-stone-500">
      <div className="font-thin text-5xl tracking-widest p-4">
        <p>我的筆記</p>
      </div>
      <hr className="my-4" />
      <OrderPicker />
      <div className="grid grid-cols-auto-fit auto-rows-[minmax(100px,auto)]">
        <Link to="/editor/newNote">
          <div className="flex justify-center items-center text-7xl font-thin text-zinc-500 bg-stone-700 h-48">
            +
          </div>
        </Link>
        {notes.map((note) => (
          <Link key={note.id} to={`/note/${note.id}`}>
            <div className="flex-col text-stone-500 h-48 p-4 border">
              <p>{note.category}</p>
              {profile.orderBy.record === 'edit' ? (
                note.edit_time > 1 ? (
                  <p>周{parseWeekday(note.edit_time)}</p>
                ) : (
                  ''
                )
              ) : note.create_time > 1 ? (
                <p>周{parseWeekday(note.create_time)}</p>
              ) : (
                ''
              )}
              {profile.orderBy.record === 'edit' ? (
                note.edit_time > 1 ? (
                  <p>
                    {note.category === 'shared' ? '收藏時間' : '編輯時間'}:
                    {parseTime(note.edit_time)}
                  </p>
                ) : (
                  ''
                )
              ) : note.create_time > 1 ? (
                <p>建立時間:{parseTime(note.create_time)}</p>
              ) : (
                ''
              )}
              <p className="font-bold font-serif text-4xl w-52 tracking-widest text-stone-800">
                {note.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
