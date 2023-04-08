import React, { useState, useEffect } from 'react';
import CommentBox from './CommentBox';
import { useAppDispatch } from '../../app/hooks';
import { addNote } from '../../app/loginSlice';
import './styles.css';
import Navigate from '../../components/Navigate';
import { useNavigate } from 'react-router-dom';
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
  const [note, setNote] = useState<NoteType>({
    id: uuidv4(),
    title: '',
    content: '',
    category: '',
    link_notes: [],
    create_time: '',
    edit_time: '',
  });
  const navigate = useNavigate();

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
  }, [note.content]);

  return (
    <div>
      <Navigate />
      <h1>筆記編輯器</h1>
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
          dispatch(addNote(note));
          window.alert('新增筆記成功!');
          navigate('/');
        }}
      >
        新增筆記
      </button>
    </div>
  );
};

export default Editor;
