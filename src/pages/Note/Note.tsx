import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ToolBar from '../../components/ToolBar';
import Header from '../../components/header';
import { useAppSelector } from '../../redux/hooks';
import { selectFontSize, selectProfile } from '../../redux/userSlice';
import * as styles from '../../utils/styles';
import { parseFontSize } from '../../utils/utils';
import ConnectGraph from './ConnectGraph';
import { useCurrentNote } from './hooks';

const Note = () => {
  const profile = useAppSelector(selectProfile);
  const fontSizeNum = useAppSelector(selectFontSize);
  const fontSize = parseFontSize(fontSizeNum);
  const { id } = useParams();
  const [toggled, setToggled] = useState(false);
  const { currentNote, referenced, shareLink } = useCurrentNote(profile, id);

  return (
    <div className="flex flex-col h-full">
      <div className="lg:pr-0 flex flex-col w-full pr-72 tracking-widest bg-stone-300 text-stone-500">
        <Header
          text={currentNote.title}
          underline
          createTime={currentNote.create_time}
          editTime={currentNote.edit_time}
          sharedBy={currentNote.sharedBy}
        />
        {currentNote.category === 'admin' ? (
          <ToolBar previous />
        ) : currentNote.category === 'shared' ? (
          <ToolBar
            previous
            deleteInfo={{ id: currentNote.id, title: currentNote.title }}
          />
        ) : (
          <ToolBar
            previous
            edit={currentNote.id}
            deleteInfo={{ id: currentNote.id, title: currentNote.title }}
          />
        )}
      </div>
      <div
        className={`lg:pt-5 lg:pr-5 relative z-0 flex flex-col w-full grow pr-96 tracking-wider bg-stone-100`}
      >
        <div
          className={`lg:flex sticky top-16 hidden cursor-pointer z-20 drop-shadow-lg w-12 h-7 self-end border ${styles.themeButton}`}
          onClick={() => setToggled(true)}
        >
          <span className="material-symbols-outlined">insights</span>
        </div>
        <div
          className={`${
            currentNote.category === 'sermon'
              ? 'bg-lime-100'
              : currentNote.category === 'devotion'
              ? 'bg-violet-100'
              : currentNote.category === 'shared'
              ? 'bg-amber-100'
              : 'bg-stone-100'
          } lg:-mt-12 sticky top-0 w-72 h-72`}
        >
          <div className="w-72 h-72 bg-stone-100 rounded-tl-full"></div>
        </div>
        <div
          className={`lg:ml-5 lg:mt-[-270px] lg:leading-relaxed ${fontSize} z-10 flex flex-col flex-wrap leading-loose text-stone-600 ml-12 mt-[-250px] pb-6 mb-12 selection:bg-fuchsia-300 selection:text-fuchsia-900`}
          dangerouslySetInnerHTML={{ __html: currentNote.content }}
        ></div>
        <div
          className={`lg:ml-5 ${fontSize} z-10 flex flex-col ml-12 py-6 border-t border-stone-400`}
        >
          {referenced.length > 0 && (
            <div className="text-stone-400">引用列表</div>
          )}
          {referenced?.map((note) => (
            <Link
              to={`/note/${note.linkId}`}
              key={note.linkId}
              className={'w-fit leading-relaxed'}
            >
              {note.linkTitle}
            </Link>
          ))}
        </div>
      </div>
      <ConnectGraph
        toggled={toggled}
        setToggled={setToggled}
        shareLink={shareLink}
        currentNote={currentNote}
      />
    </div>
  );
};

export default Note;
