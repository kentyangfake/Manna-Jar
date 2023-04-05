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
      const matches: { id: number; value: string; link: string }[] = [];
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

const BibleReference = async (book: string, chapter: string, verse: string) => {
  try {
    const response = await fetch(
      `https://bible.fhl.net/json/qb.php?chineses=${book}&chap=${chapter}&sec=${verse}`
    );
    const data = await response.json();
    let verses = `${book} ${chapter}:${verse} <br>`;
    data.record.map(
      (sec: { sec: string; bible_text: string }) =>
        (verses += `[${sec.sec}]${sec.bible_text}`)
    );
    return verses;
  } catch (error) {
    console.error(error);
  }
};

function CommentBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const handleChange = (content: string) => {
    onChange(content);
  };

  const handleKeyDown = async (event: KeyboardEvent) => {
    if (event.key === ' ') {
      const cursorPosition = (event.target as HTMLInputElement).selectionStart!;
      const beforeCursor = value.slice(0, cursorPosition);
      const afterCursor = value.slice(cursorPosition);
      const lastReference = beforeCursor.match(
        /([\u4E00-\u9FFF]{1,2})(\d+):([\d,-]+)/
      );

      if (lastReference) {
        const referenceStart = beforeCursor.lastIndexOf(lastReference[0]);
        const referenceEnd = referenceStart + lastReference[0].length;

        const book = lastReference[1];
        const chapter = lastReference[2];
        const verse = lastReference[3];
        await BibleReference(book, chapter, verse).then((text) => {
          onChange(
            beforeCursor.slice(0, referenceStart) +
              text +
              afterCursor.slice(referenceEnd)
          );
        });
        event.preventDefault();
      }
    }
  };

  return (
    <>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        modules={modules}
      />
      <div dangerouslySetInnerHTML={{ __html: value }}></div>
    </>
  );
}

export default CommentBox;
