import React, { useState, useEffect } from 'react';
import NetworkGraph from '../../components/NetworkGraph';
import { openAI } from '../../utils/openAI';
import { useAppSelector } from '../../app/hooks';
import { selectProfile } from '../../app/loginSlice';
import SizePicker from '../../components/SizePicker';
import * as styles from '../../utils/styles';
import { ReactComponent as Star } from '../../assets/star.svg';

const GraphView = () => {
  const profile = useAppSelector(selectProfile);
  const [titles, setTitles] = useState<string[]>([]);
  const [recentNotes, setRecentNotes] = useState<string[]>([]);
  const [filtBy, setFiltBy] = useState('all');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [summeries, setSummeries] = useState('讓ai幫你回顧最近的筆記吧!');
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    if (!profile.isLogin) {
      return;
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
    // const res = await openAI.summarize(titles, recentNotes);
    const res =
      '(排版用)根據你最近的筆記，你的信仰狀況是持續思考聖經中的信息，並試圖理解和應用這些信息到自己的生活和信仰中。 我推薦你複習的三篇筆記是「耶穌喜愛的家人」、「什麼是上好的福份？」和「教學筆記」，這些筆記涵蓋了關於信仰、家庭、個人成長和教學等方面的豐富內容，能夠加強你對基督信仰的理解和實踐。';
    setIsAiTyping(false);
    setSummeries(res);
  };

  return (
    <div className="flex h-full w-full">
      <div className="flex flex-col grow justify-between h-full">
        <SizePicker />
        <div className="flex justify-center items-center w-full h-full pl-5 pr-14 py-5 sky tracking-widest">
          <div
            className={`relative h-full w-full rounded-[100%/100%] bg-stone-300 texture border border-stone-500`}
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
            <Star className={`star1 fixed top-[10%] right-[20%] h-14`} />
            <Star className={`star2 fixed bottom-[6%] right-[16%] h-24`} />
            <Star className={`star3 fixed bottom-[4%] left-[20%] h-10`} />
            <NetworkGraph filtBy={filtBy} />
          </div>
        </div>
      </div>
      <div
        className={`${styles.theme} fixed flex flex-col z-20 top-0 right-0 h-full w-7 border-l border-stone-500`}
      >
        <div className={`${styles.theme} border-y h-8`}></div>
        <div
          className={`${styles.themeButton} grow`}
          onClick={() => setToggled((prev) => !prev)}
        >
          {toggled ? '›' : '‹'}
        </div>
      </div>
      <div
        className={`${
          toggled
            ? 'fixed z-10 top-8 right-0 h-full w-96 border-r pl-3 pr-10 track-widest leading-relaxed border-stone-500 bg-[rgba(68,64,60,0.7)] backdrop-blur'
            : 'hidden'
        }`}
      >
        <div
          className="cursor-pointer border-b py-3 text-white text-4xl italic tracking-widest"
          onClick={handleAiResponse}
        >
          {isAiTyping ? '回答中...' : 'AI回顧'}
        </div>

        <div className="text-white pt-3">
          <div>{summeries}</div>
        </div>
      </div>
    </div>
  );
};

export default GraphView;
