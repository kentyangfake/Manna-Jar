import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectProfile, addNote } from '../../app/loginSlice';
import { Link, useSearchParams } from 'react-router-dom';
import { parseDate, parseWeekday } from '../../utils/utils';
import { firestore } from '../../utils/firebase';
import OrderPicker from './OrderPicker';
import Header from '../../components/header';
import * as styles from '../../utils/styles';

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
    <div className="flex flex-col w-full h-full min-h-screen tracking-widest bg-stone-500 text-stone-500">
      <Header text={'我的筆記'} />
      <OrderPicker />
      <div className="grid grid-cols-auto-fit auto-rows-[minmax(100px,auto)]">
        {category === 'shared' ? (
          ''
        ) : (
          <Link to="/editor/newNote">
            <div className="flex justify-center items-center text-7xl font-thin text-stone-400 bg-stone-200 h-52 rounded-3xl border border-stone-500 hover:bg-stone-100">
              +
            </div>
          </Link>
        )}
        {notes.map((note) => (
          <Link key={note.id} to={`/note/${note.id}`}>
            <div
              className={
                note.category === 'sermon'
                  ? styles.limeCard
                  : note.category === 'devotion'
                  ? styles.violetCard
                  : note.category === 'shared'
                  ? styles.amberCard
                  : styles.whiteCard
              }
            >
              <div className="flex justify-between px-2 h-6">
                <div>- -</div>
                {profile.orderBy.record === 'edit' ? (
                  note.edit_time > 1 ? (
                    <>
                      <p className="font-medium">
                        {note.category === 'shared' ? '收藏於 ' : ''}
                        {parseDate(note.edit_time)}
                      </p>
                    </>
                  ) : (
                    ''
                  )
                ) : note.create_time > 1 ? (
                  <>
                    <p className="font-medium">{parseDate(note.create_time)}</p>
                  </>
                ) : (
                  ''
                )}
                {profile.orderBy.record === 'edit' ? (
                  note.edit_time > 1 ? (
                    <p>
                      周<br />
                      {parseWeekday(note.edit_time)}
                    </p>
                  ) : (
                    ''
                  )
                ) : note.create_time > 1 ? (
                  <p>
                    周<br />
                    {parseWeekday(note.create_time)}
                  </p>
                ) : (
                  ''
                )}
              </div>
              <hr className="self-center my-2 w-40 border-stone-500" />
              <div className="mt-auto font-bold font-serif text-4xl w-64 pl-4 pb-6 tracking-widest text-stone-800">
                {note.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className={`${styles.theme} grow border`}></div>
    </div>
  );
};

export default Home;
