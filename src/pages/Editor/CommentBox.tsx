import 'quill-mention';
import { useEffect, useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAppSelector } from '../../redux/hooks';
import { selectProfile } from '../../redux/userSlice';
import { getBibleReference } from '../../utils/utils';

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
      link: `/note/${note.id}`,
    }));
    setHashValues(newHashValue);
  }, [profile.isLogin]);

  const modules = useMemo(
    () => ({
      mention: mentionModuleConfig(hashValues),
      toolbar: {
        handlers: {
          link: function (value: string) {
            const that: any = this;

            const tooltip = that.quill.theme.tooltip;
            const input = tooltip.root.querySelector('input[data-link]');
            input.dataset.link = 'https://';
            input.placeholder = 'https://';
            input.dataset.lpignore = true;
            if (value) {
              const range = that.quill.getSelection();
              if (range == null || range.length === 0) {
                return;
              }
              let preview = that.quill.getText(range);
              if (
                /^\S+@\S+\.\S+$/.test(preview) &&
                preview.indexOf('mailto:') !== 0
              ) {
                preview = `mailto:${preview}`;
              }
              const { tooltip } = that.quill.theme;
              tooltip.edit('link', '');
            } else {
              that.quill.format('link', false);
            }
          },
        },
      },
    }),
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
        /([\u4E00-\u9FFF]{1,7})(\d+):([\d,-]+)/
      );

      if (lastReference) {
        const referenceStart = beforeCursor.lastIndexOf(lastReference[0]);
        const referenceEnd = referenceStart + lastReference[0].length;

        const book = lastReference[1];
        const chapter = lastReference[2];
        const verse = lastReference[3];
        document.body.style.cursor = 'wait';
        const bibleText = await getBibleReference(book, chapter, verse);
        onChange(
          beforeCursor.slice(0, referenceStart) +
            bibleText +
            afterCursor.slice(referenceEnd)
        );
        document.body.style.cursor = 'default';
        event.preventDefault();
      }
    }
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        className={`flex flex-col flex-wrap leading-loose text-stone-600 selection:bg-orange-100 selection:text-orange-500`}
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
