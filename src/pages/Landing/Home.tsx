import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../../components/header';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { NoteType } from '../../redux/types';
import { addNote, selectProfile } from '../../redux/userSlice';
import { WarningSwal } from '../../utils/CustomSwal';
import { firestore } from '../../utils/firebase';
import * as styles from '../../utils/styles';
import { parseDate, parseWeekday } from '../../utils/utils';
import OrderPicker from './OrderPicker';

const Home = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const shareBy = searchParams.get('shareBy');
  const shareNoteId = searchParams.get('shareNote');
  const recordKey = `${profile.orderBy.record}_time` as keyof NoteType;

  const categoryData = {
    sermon: { name: '聚會崇拜', style: styles.limeCard },
    devotion: { name: '個人靈修', style: styles.violetCard },
    shared: { name: '分享收藏', style: styles.amberCard },
    admin: { name: '管理員', style: styles.whiteCard },
  };

  useEffect(() => {
    if (!shareBy || !shareNoteId || shareBy === profile.id) {
      return;
    }
    const getShareNoteViaLink = async () => {
      const shareNote = await firestore.getShareNote(shareBy, shareNoteId);
      if (!shareNote.id) {
        WarningSwal.fire({
          text: '此分享連結已失效',
        });
        return;
      }
      dispatch(addNote(shareNote));
    };

    getShareNoteViaLink();
  }, []);

  const notes = category
    ? [...profile.notes.filter((note) => note.category === category)]
    : profile.notes;

  return (
    <div className="flex flex-col w-full h-fit min-h-screen tracking-widest bg-stone-500 text-stone-500">
      <Header
        text={
          categoryData[category as keyof typeof categoryData]?.name ||
          '我的筆記'
        }
      />
      <OrderPicker />
      <div className="grid grid-cols-auto-fit gap-[1px] auto-rows-[minmax(100px,auto)]">
        {category !== 'shared' && (
          <Link
            to={
              category === 'devotion'
                ? '/editor/newNoteDevotion'
                : '/editor/newNote'
            }
          >
            <div className="flex justify-center items-center text-7xl font-thin text-stone-400 bg-stone-200 h-52 rounded-3xl hover:bg-stone-100">
              +
            </div>
          </Link>
        )}
        {notes.map((note) => (
          <Link key={note.id} to={`/note/${note.id}`}>
            <div
              className={
                categoryData[note.category as keyof typeof categoryData]?.style
              }
            >
              <div className="flex justify-between px-2 h-6">
                <div className="text-stone-200">---</div>
                {(note[recordKey] as number) > 1 && (
                  <p className="font-medium">
                    {note.category === 'shared' && '收藏於 '}
                    {parseDate(note[recordKey] as number)}
                  </p>
                )}
                {(note[recordKey] as number) > 1 && (
                  <p className="mt-2 text-xl font-extralight">
                    周<br />
                    {parseWeekday(note[recordKey] as number)}
                  </p>
                )}
              </div>
              <hr className="self-center my-2 w-24 border-stone-500" />
              <div className="mt-auto font-bold font-serif text-4xl w-64 pl-4 pb-6 tracking-widest text-stone-800">
                {note.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className={`${styles.theme} grow border-t`}></div>
    </div>
  );
};

export default Home;
