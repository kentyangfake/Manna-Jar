import React, { useState, useEffect } from 'react';
import CommentBox from './CommentBox';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectProfile, addNote, editNote } from '../../app/loginSlice';
import './styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { NoteType } from '../../app/types';
import * as styles from '../../utils/styles';

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
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [note, setNote] = useState<NoteType>({
    id: uuidv4(),
    title: '',
    content: '',
    category: 'sermon',
    link_notes: [],
    create_time: new Date().getTime(),
    edit_time: new Date().getTime(),
  });
  const navigate = useNavigate();
  const profile = useAppSelector(selectProfile);
  const { id } = useParams();

  useEffect(() => {
    if (!profile.isLogin) {
      return;
    }

    if (id !== 'newNote') {
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
          className="grow bg-stone-100 h-16 -mb-3 text-sky-500 overflow-hidden italic tracking-[.3em] focus:outline-none"
          value={note.title}
          type="text"
          placeholder="請輸入標題"
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        ></input>
      </div>
      <div className="flex h-[26px]">
        {category.map((option) => (
          <div
            key={option.value}
            className={`${styles.themeButtonNoBg} grow border-r ${
              note.category === option.value &&
              (option.value === 'sermon' ? 'bg-lime-100' : 'bg-violet-100')
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
          className={`${styles.themeButton} w-32 border-y border-l`}
          onClick={() => {
            isEdit ? handleEditNote() : handleAddNote();
          }}
        >
          {isEdit ? '儲存修改' : '新增筆記'}
        </div>
        <div
          className={`${styles.themeButton} w-32 border-y border-l`}
          onClick={() => {
            isEdit ? navigate(`/note/${id}`) : navigate('/');
          }}
        >
          取消
        </div>
      </div>
    </div>
  );
};

export default Editor;
