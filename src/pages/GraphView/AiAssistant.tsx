import { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectFontSize, selectProfile } from '../../redux/userSlice';
import { openAI } from '../../utils/openAI';
import * as styles from '../../utils/styles';
import { parseFontSize } from '../../utils/utils';

interface Props {
  titles: string[];
  recentNotes: string[];
  summaries: string;
  setSummaries: React.Dispatch<React.SetStateAction<string>>;
  toggled: boolean;
  setToggled: React.Dispatch<React.SetStateAction<boolean>>;
}

const AiAssistant = ({
  titles,
  recentNotes,
  summaries,
  setSummaries,
  toggled,
  setToggled,
}: Props) => {
  const profile = useAppSelector(selectProfile);
  const fontSizeNum = useAppSelector(selectFontSize);
  const fontSize = parseFontSize(fontSizeNum);
  const [isAiTyping, setIsAiTyping] = useState(false);

  const handleAiResponse = async () => {
    setIsAiTyping(true);
    const res = await openAI.summarize(titles, recentNotes);
    setIsAiTyping(false);
    setSummaries(res);
  };

  return (
    <>
      <div
        className={`lg:hidden ${styles.theme} fixed flex flex-col z-30 top-0 right-0 h-full w-7 border-l border-stone-500`}
      >
        <div className={`${styles.theme} border-b h-8 -mt-[1px]`} />
        <div
          className={`${styles.navButtonSmall} ${
            toggled
              ? 'bg-blue-50 border-b'
              : 'bg-blue-100 border-b-2 hover:bg-blue-50 hover:border-b-4 hover:border-l'
          }  h-32`}
          onClick={() => setToggled((prev) => !prev)}
        >
          {toggled ? '›' : 'AI'}
        </div>
        <div className={`${styles.theme} grow`} />
      </div>
      <div
        className={`${
          toggled
            ? 'lg:top-12 xs:w-full lg:pl-5 lg:pr-5 fixed flex flex-col z-20 top-8 right-0 h-full w-96 border-x pl-3 pr-10 text-stone-500 border-stone-500 bg-[rgba(214,211,208,0.7)] backdrop-blur'
            : 'hidden'
        }`}
      >
        <div className="flex border-b border-stone-500 py-3">
          <div className="text-2xl italic tracking-widest">信仰回顧</div>
          <div
            className={`lg:flex ${styles.themeButtonNoBg} hidden ml-auto w-10 h-10 rounded-full`}
            onClick={() => setToggled((prev) => !prev)}
          >
            <span className="material-symbols-outlined">close</span>
          </div>
        </div>
        <div
          className={`${fontSize} pt-3 tracking-wider leading-relaxed overflow-y-auto`}
        >
          {summaries}
        </div>
        {profile.notes.length > 5 && (
          <div
            className={`${styles.themeButtonNoBg} ${
              isAiTyping && 'bg-stone-100'
            } self-center mt-10 w-32 h-10 border`}
            onClick={() => {
              if (isAiTyping) return;
              handleAiResponse();
            }}
          >
            {isAiTyping ? '回答中...' : 'AI回顧'}
          </div>
        )}
      </div>
    </>
  );
};

export default AiAssistant;
