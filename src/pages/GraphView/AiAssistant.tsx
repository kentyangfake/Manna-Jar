import { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectFontSize, selectProfile } from '../../redux/userSlice';
import { openAI } from '../../utils/openAI';
import * as styles from '../../utils/styles';
import { parseFontSize } from '../../utils/utils';

interface Props {
  titles: string[];
  recentNotes: string[];
  summeries: string;
  setSummeries: React.Dispatch<React.SetStateAction<string>>;
}

const AiAssistant = ({
  titles,
  recentNotes,
  summeries,
  setSummeries,
}: Props) => {
  const profile = useAppSelector(selectProfile);
  const fontSizeNum = useAppSelector(selectFontSize);
  const fontSize = parseFontSize(fontSizeNum);
  const [toggled, setToggled] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);

  const handleAiResponse = async () => {
    setIsAiTyping(true);
    const res = await openAI.summarize(titles, recentNotes);
    setIsAiTyping(false);
    setSummeries(res);
  };

  return (
    <>
      <div
        className={`${styles.theme} fixed flex flex-col z-30 top-0 right-0 h-full w-7 border-l border-stone-500`}
      >
        <div className={`${styles.theme} border-b h-8 -mt-[1px]`}></div>
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
        <div className={`${styles.theme} grow`}></div>
      </div>
      <div
        className={`${
          toggled
            ? 'fixed flex flex-col z-20 top-8 right-0 h-full w-96 border-x pl-3 pr-10 text-stone-500 border-stone-500 bg-[rgba(214,211,208,0.7)] backdrop-blur'
            : 'hidden'
        }`}
      >
        <div className="border-b border-stone-500 py-3 text-2xl italic tracking-widest">
          信仰回顧
        </div>
        <div
          className={`${fontSize} pt-3 tracking-wider leading-relaxed overflow-y-auto`}
        >
          {summeries}
        </div>
        {profile.notes.length > 5 && (
          <div
            className={`${styles.themeButtonNoBg} ${
              isAiTyping && 'bg-stone-100'
            } self-center mt-10 w-32 h-10 border`}
            onClick={handleAiResponse}
          >
            {isAiTyping ? '回答中...' : 'AI回顧'}
          </div>
        )}
      </div>
    </>
  );
};

export default AiAssistant;
