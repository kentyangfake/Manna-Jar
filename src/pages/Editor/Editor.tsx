import React from 'react';
import CommentBox from './CommentBox';
import './styles.css';

const Editor = () => {
  return (
    <div className="App">
      <h1>筆記編輯器</h1>
      <CommentBox />
    </div>
  );
};

export default Editor;
