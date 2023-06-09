import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addNote, editNote, selectProfile } from '../../redux/userSlice';
import * as styles from '../../utils/styles';
import CommentBox from './CommentBox';
import EditorHelper from './EditorHelper';
import { useEditNote } from './hooks';
import './styles.css';

const category = [
  {
    label: '聚會崇拜',
    value: 'sermon',
  },
  {
    label: '個人靈修',
    value: 'devotion',
  },
];

const Editor = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const profile = useAppSelector(selectProfile);
  const { note, isEdit, setNote } = useEditNote(profile, id);

  const createLink = () => {
    const linkArray = [];
    const regex =
      /<a href=&quot;\/note\/([a-zA-Z0-9-]+)&quot;[^>]*>(.*?)<\/a>/g;
    let match;
    while ((match = regex.exec(note.content)) !== null) {
      const id = match[1];
      const title = match[2]?.match(/^(.*?)\s/)?.[1].replace(/\"$/, '') || '';
      linkArray.push({ id, title });
    }
    setNote({
      ...note,
      link_notes: linkArray,
      edit_time: new Date().getTime(),
    });
  };

  useEffect(() => {
    createLink();
  }, [note.content]);

  const handleAddNote = () => {
    dispatch(addNote(note));
    navigate('/');
  };
  const handleEditNote = () => {
    dispatch(editNote(note));
    navigate(`/note/${id}`);
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className={`lg:tracking-widest lg:min-h-12 lg:p-2 lg:pl-4 lg:text-2xl mt-[1px] flex items-center p-5 min-h-20 text-4xl tracking-[.3em] italic text-stone-500 bg-stone-100 border-b border-stone-500`}
      >
        <div className={`lg:text-xl ${styles.underline} decoration-orange-300`}>
          {isEdit ? `編輯:` : '新筆記:'}
        </div>
        <input
          className="grow max-w-[72vw] bg-stone-100 text-sky-500 overflow-hidden italic tracking-widest focus:outline-none"
          value={note.title}
          type="text"
          placeholder="請輸入標題"
          maxLength={10}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        ></input>
      </div>
      <div className="flex h-[26px]">
        {category.map((option) => (
          <div
            key={option.value}
            className={`${styles.themeButtonNoBg} grow border-r ${
              note.category === option.value &&
              (note.category === 'sermon'
                ? 'bg-lime-100 border-b'
                : 'bg-violet-100 border-b')
            }`}
            onClick={() => setNote({ ...note, category: option.value })}
          >
            {option.label}
          </div>
        ))}
      </div>
      <CommentBox
        value={note.content}
        onChange={(newContent: string) => {
          setNote({ ...note, content: newContent });
        }}
      />
      <div className="flex h-10">
        <div className={`xs:hidden ${styles.theme} grow border-y`}></div>
        <div
          className={`xs:grow ${styles.themeButton} w-32 border-t border-b-2 border-l hover:border-b-4 hover:border-l-2`}
          onClick={() => {
            isEdit ? handleEditNote() : handleAddNote();
          }}
        >
          {isEdit ? '儲存修改' : '新增筆記'}
        </div>
        <div
          className={`xs:grow ${styles.themeButton} w-32 border-t border-b-2 border-l hover:border-b-4 hover:border-l-2`}
          onClick={() => {
            isEdit ? navigate(`/note/${id}`) : navigate('/');
          }}
        >
          取消
        </div>
        <EditorHelper />
      </div>
    </div>
  );
};

export default Editor;
