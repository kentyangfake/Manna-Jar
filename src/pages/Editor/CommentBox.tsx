import React from 'react';
import ReactQuill from 'react-quill';
import 'quill-mention';
import 'react-quill/dist/quill.snow.css';

const hashValues = [
  { id: 3, value: '第一篇筆記', link: '/note?id=1' },
  { id: 4, value: '某個讀經進度', link: '/note?id=1' },
];

const mentionModuleConfig = {
  allowedChars: /^[\u4e00-\u9fa5A-Za-z\s]*$/,
  mentionDenotationChars: ['#'],
  linkTarget: '_self',
  source: function (searchTerm: string, renderList: any) {
    let values = hashValues;

    if (searchTerm.length === 0) {
      renderList(values, searchTerm);
    } else {
      const matches = [];
      for (let i = 0; i < values.length; i++)
        if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
          matches.push(values[i]);
      renderList(matches, searchTerm);
    }
  },
};

const modules = {
  mention: mentionModuleConfig,
};

function CommentBox() {
  const [value, setValue] = React.useState('');
  console.log(value);
  const handleChange = (content: string) => {
    setValue(content);
    // onChange(content); // should useDebounce
  };
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={handleChange}
      modules={modules}
    />
  );
}

export default CommentBox;
