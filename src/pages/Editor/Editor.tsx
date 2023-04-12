import React, { useState, useEffect } from 'react';
import CommentBox from './CommentBox';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectProfile, addNote, editNote } from '../../app/loginSlice';
import './styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { NoteType } from '../../app/types';

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
    category: '',
    link_notes: [],
    //使用Unix Timestamp
    create_time: new Date().getTime(),
    edit_time: 1,
  });
  const navigate = useNavigate();
  //TODO:用網址id判斷是edit || newNote
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
    setNote({ ...note, link_notes: linkArray });
  };

  useEffect(() => {
    createLink();
    setNote({ ...note, edit_time: new Date().getTime() });
  }, [note.content]);

  const handleAddNote = () => {
    dispatch(addNote(note));
    window.alert('新增筆記成功!');
    navigate('/');
  };
  const handleEditNote = () => {
    dispatch(editNote(note));
    window.alert('修改筆記成功!');
    navigate(`/note/${id}`);
  };

  return (
    <div>
      <h1>{isEdit ? `編輯:${note.title}` : '新筆記'}</h1>
      <div>
        <label>筆記標題</label>
        <input
          value={note.title}
          type="text"
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        ></input>
      </div>
      <div>
        <label>筆記分類</label>
        {category.map((option) => (
          <div key={option.value}>
            <input
              type="radio"
              checked={note.category === option.value}
              onChange={(e) => {
                if (e.target.checked)
                  setNote({ ...note, category: option.value });
              }}
            />
            <label>{option.label}</label>
          </div>
        ))}
      </div>
      <CommentBox
        value={note.content}
        onChange={(newContent: string) => {
          setNote({ ...note, content: newContent });
        }}
      />
      <button
        onClick={() => {
          //用id判斷要addNote || editNote和要navigate到哪
          isEdit ? handleEditNote() : handleAddNote();
        }}
      >
        {isEdit ? '儲存修改' : '新增筆記'}
      </button>
      <button
        onClick={() => {
          isEdit ? navigate(`/note/${id}`) : navigate('/');
        }}
      >
        取消
      </button>
    </div>
  );
};

export default Editor;
