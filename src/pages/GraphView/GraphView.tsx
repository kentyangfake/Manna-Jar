import React, { useState, useEffect } from 'react';
import NetworkGraph from '../../components/NetworkGraph';
import { openAI } from '../../utils/openAI';
import { useAppSelector } from '../../app/hooks';
import { selectProfile } from '../../app/loginSlice';
import { useNavigate } from 'react-router-dom';
import SizePicker from '../../components/SizePicker';
import * as styles from '../../utils/styles';
import { ReactComponent as Star } from '../../assets/star.svg';

const GraphView = () => {
  const profile = useAppSelector(selectProfile);
  const navigate = useNavigate();
  const [titles, setTitles] = useState<string[]>([]);
  const [recentNotes, setRecentNotes] = useState<string[]>([]);
  const [filtBy, setFiltBy] = useState('all');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [summeries, setSummeries] = useState('讓AI幫你回顧最近的筆記吧!');
  const [toggled, setToggled] = useState(false);

  let fontSize = 'text-base';
  switch (profile.fontSize) {
    case 'small':
      fontSize = 'text-base';
      break;
    case 'medium':
      fontSize = 'text-lg';
      break;
    case 'large':
      fontSize = 'text-xl';
      break;
    default:
      fontSize = 'text-base';
  }

  useEffect(() => {
    if (!profile.isLogin) {
      navigate('/');
    }

    if (profile.notes.length < 5) {
      setSummeries('累積更多筆記後解鎖此功能。');
    }

    const notesArr = [...profile.notes]
      .filter((note) => note.category !== 'shared')
      .sort((a, b) => b.create_time - a.create_time)
      .reduce((notes: string[], note) => [...notes, note.content], [])
      .slice(0, 3);
    const titlesArr = [...profile.notes].reduce(
      (titles: string[], note) => [...titles, note.title],
      []
    );

    setRecentNotes(notesArr);
    setTitles(titlesArr);
  }, [profile.isLogin]);

  const handleAiResponse = async () => {
    setIsAiTyping(true);
    const res = await openAI.summarize(titles, recentNotes);
    setIsAiTyping(false);
    setSummeries(res);
  };

  return (
    <div className="flex h-full w-full">
      <div className="flex flex-col grow justify-between h-full">
        <SizePicker fullGraph />
        <div className="flex justify-center items-center w-full h-full pl-5 pr-14 py-5 sky tracking-widest">
          <div
            className={`cursor-crosshair relative grow h-full rounded-[100%/100%] bg-stone-300 texture border border-stone-500`}
          >
            <div className={`absolute z-10 top-5 left-5 flex flex-col gap-2`}>
              <div
                className={`py-1 px-2 border rounded-full text-xs ${
                  styles.themeButtonNoBg
                } ${filtBy === 'all' ? 'bg-stone-100' : 'bg-stone-300'}`}
                onClick={() => setFiltBy('all')}
              >
                全部筆記
              </div>
              <div
                className={`py-1 px-2 border rounded-full text-xs ${
                  styles.themeButtonNoBg
                } ${filtBy === 'sermon' ? 'bg-lime-100' : 'bg-stone-300'}`}
                onClick={() => setFiltBy('sermon')}
              >
                聚會崇拜
              </div>
              <div
                className={`py-1 px-2 border rounded-full text-xs ${
                  styles.themeButtonNoBg
                } ${filtBy === 'devotion' ? 'bg-violet-100' : 'bg-stone-300'}`}
                onClick={() => setFiltBy('devotion')}
              >
                個人靈修
              </div>
              <div
                className={`py-1 px-2 border rounded-full text-xs ${
                  styles.themeButtonNoBg
                } ${filtBy === 'shared' ? 'bg-amber-100' : 'bg-stone-300'}`}
                onClick={() => setFiltBy('shared')}
              >
                分享收藏
              </div>
            </div>
            <Star className={`star1 fixed z-20 top-[10%] right-[20%] h-14`} />
            <Star className={`star2 fixed z-20 bottom-[6%] right-[16%] h-24`} />
            <Star className={`star3 fixed z-20 bottom-[4%] left-[20%] h-10`} />
            <NetworkGraph
              filtBy={filtBy}
              selectFontSize={profile.fontSize}
              userNotes={profile.notes}
            />
          </div>
        </div>
      </div>
      <div
        className={`${styles.theme} fixed flex flex-col z-30 top-0 right-0 h-full w-7 border-l border-stone-500`}
      >
        <div className={`${styles.theme} border-y h-8`}></div>
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
        <div className={`${fontSize} pt-3 tracking-wider leading-relaxed`}>
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
    </div>
  );
};

export default GraphView;
