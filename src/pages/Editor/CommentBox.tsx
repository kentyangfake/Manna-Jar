import React, { useState, useEffect, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'quill-mention';
import 'react-quill/dist/quill.snow.css';
import { useAppSelector } from '../../app/hooks';
import { selectProfile } from '../../app/loginSlice';
import { BibleReference } from '../../utils/api';

interface hashValue {
  id: string;
  value: string;
  link: string;
}

const mentionModuleConfig = (
  hashValues: {
    id: string;
    value: string;
    link: string;
  }[]
) => ({
  allowedChars: /^[\u4e00-\u9fa5A-Za-z\s]*$/,
  mentionDenotationChars: ['#'],
  linkTarget: '_self',
  source: function (searchTerm: string, renderList: any) {
    let values = hashValues;

    if (searchTerm.length === 0) {
      renderList(values, searchTerm);
    } else {
      const matches: { id: string; value: string; link: string }[] = [];
      for (let i = 0; i < values.length; i++)
        if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
          matches.push(values[i]);
      renderList(matches, searchTerm);
    }
  },
});

const CommentBox = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [hashValues, setHashValues] = useState<hashValue[]>([]);
  const profile = useAppSelector(selectProfile);

  useEffect(() => {
    const newHashValue = profile.notes.map((note) => ({
      id: note.id,
      value: note.title || '',
      link: `/note?id=${note.id}`,
    }));
    setHashValues(newHashValue);
  }, [profile.isLogin]);

  const modules = useMemo(
    () => ({ mention: mentionModuleConfig(hashValues) }),
    [hashValues]
  );

  if (hashValues.length === 0) {
    return null;
  }

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
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={(content: string) => {
          onChange(content);
        }}
        onKeyDown={handleKeyDown}
        modules={modules}
      />
    </div>
  );
};

export default CommentBox;
