import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import autoVerse from '../../assets/autoVerse.gif';
import backLinks from '../../assets/backLinks.gif';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addNote, editNote, selectProfile } from '../../redux/loginSlice';
import { NoteType } from '../../redux/types';
import * as styles from '../../utils/styles';
import CommentBox from './CommentBox';
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
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [note, setNote] = useState<NoteType>({
    id: uuidv4(),
    title: '',
    content: '',
    category: id === 'newNoteDevotion' ? 'devotion' : 'sermon',
    link_notes: [],
    create_time: new Date().getTime(),
    edit_time: new Date().getTime(),
  });
  const navigate = useNavigate();
  const profile = useAppSelector(selectProfile);
  const [toggleHelp, settoggleHelp] = useState(false);

  useEffect(() => {
    if (!profile.isLogin) {
      return;
    }

    if (id !== 'newNote' && id !== 'newNoteDevotion') {
      const currentNote = profile.notes.find((note) => note.id === id);
      setIsEdit(true);
      setNote(currentNote!);
    }
  }, [profile.isLogin, isEdit]);

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
    <div>
      <div
        className={`mt-[1px] flex items-end p-5 h-20 text-4xl tracking-[.3em] italic text-stone-500 bg-stone-100 border-b border-stone-500`}
      >
        <div className={`${styles.underline} decoration-orange-300`}>
          {isEdit ? `編輯:` : '新筆記:'}
        </div>
        <input
          className="grow bg-stone-100 h-16 -mb-3 text-sky-500 overflow-hidden italic tracking-widest focus:outline-none"
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
        <div className={`${styles.theme} grow border-y`}></div>
        <div
          className={`${styles.themeButton} w-32 border-t border-b-2 border-l hover:border-b-4 hover:border-l-2`}
          onClick={() => {
            isEdit ? handleEditNote() : handleAddNote();
          }}
        >
          {isEdit ? '儲存修改' : '新增筆記'}
        </div>
        <div
          className={`${styles.themeButton} w-32 border-t border-b-2 border-l hover:border-b-4 hover:border-l-2`}
          onClick={() => {
            isEdit ? navigate(`/note/${id}`) : navigate('/');
          }}
        >
          取消
        </div>
        {/* helper */}
        <div
          className={`relative ${styles.themeFlex} w-20 border-l border-y ${
            toggleHelp
              ? 'bg-stone-100'
              : 'bg-stone-300 border-b-2 hover:bg-stone-200 hover:border-b-4 hover:border-l-2'
          }`}
        >
          <span
            className="cursor-pointer material-symbols-outlined text-lg grow text-center"
            onClick={() => {
              settoggleHelp((prev) => !prev);
            }}
          >
            help
          </span>
          <div
            className={`${toggleHelp ? 'flex' : 'hidden'} ${
              styles.theme
            } text-lg overflow-y-auto flex-col border absolute z-10 right-0 bottom-[38px] h-80 w-72 p-4 rounded-t-3xl rounded-bl-3xl drop-shadow-xl`}
          >
            <div className="mb-3 font-semibold">自動經文輸入</div>
            <span>
              可以透過
              <span
                className="cursor-pointer text-violet-400"
                onClick={() =>
                  Swal.fire({
                    imageUrl: autoVerse,
                    imageWidth: 1000,
                    imageAlt: 'autoVerseImg',
                    showConfirmButton: false,
                    background: 'rgba(255,255,255,0)',
                  })
                }
              >
                經文輸入
              </span>
              功能自動輸入經文，只要簡單輸入書卷名稱，章節和經節(
              <i>例:出埃及記16:4</i>
              )，再按下<i>空白鍵</i>
              ，經文就會自動出現。此功能支援書卷簡稱，詳細書卷簡稱可至
              <i>教學筆記</i>查看。
            </span>
            <div className="mt-5 mb-3 font-semibold">建立連結</div>
            <span>
              可以透過輸入<i>#</i>後，選取<i>筆記標題</i>
              (亦可接著輸入搜尋文字)來建立
              <span
                className="cursor-pointer text-violet-400"
                onClick={() =>
                  Swal.fire({
                    imageUrl: backLinks,
                    imageWidth: 1000,
                    imageAlt: 'backLinksImg',
                    showConfirmButton: false,
                    background: 'rgba(255,255,255,0)',
                  })
                }
              >
                筆記連結
              </span>
              ，建立連結後會自動在對應筆記的引用列表新增當前筆記。
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
