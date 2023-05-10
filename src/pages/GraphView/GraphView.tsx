import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Star } from '../../assets/star.svg';
import NetworkGraph from '../../components/NetworkGraph';
import ToolBar from '../../components/ToolBar';
import { useAppSelector } from '../../redux/hooks';
import { selectFontSize, selectProfile } from '../../redux/loginSlice';
import * as styles from '../../utils/styles';
import AiAssistant from './AiAssistant';

const GraphView = () => {
  const profile = useAppSelector(selectProfile);
  const fontSizeNum = useAppSelector(selectFontSize);
  const navigate = useNavigate();
  const [titles, setTitles] = useState<string[]>([]);
  const [recentNotes, setRecentNotes] = useState<string[]>([]);
  const [filtBy, setFiltBy] = useState('all');
  const [summeries, setSummeries] = useState('讓AI幫你回顧最近的筆記吧!');

  useEffect(() => {
    if (!profile.isLogin) {
      navigate('/');
    }

    if (profile.notes.length < 6) {
      setSummeries('累積5篇筆記後解鎖此功能。');
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

  const filterOptions = [
    {
      lable: '全部筆記',
      value: 'all',
      style: filtBy === 'all' ? 'bg-stone-100' : 'bg-stone-300',
    },
    {
      lable: '聚會崇拜',
      value: 'sermon',
      style: filtBy === 'sermon' ? 'bg-lime-100' : 'bg-stone-300',
    },
    {
      lable: '個人靈修',
      value: 'devotion',
      style: filtBy === 'devotion' ? 'bg-violet-100' : 'bg-stone-300',
    },
    {
      lable: '分享收藏',
      value: 'shared',
      style: filtBy === 'shared' ? 'bg-amber-100' : 'bg-stone-300',
    },
  ];

  return (
    <div className="flex h-full w-full">
      <div className="flex flex-col grow justify-between h-full">
        <div className="h-8">
          <ToolBar fullGraph />
        </div>
        <div className="flex relative justify-center items-center grow pl-5 pr-14 py-5 sky tracking-widest">
          <div className={`absolute z-10 top-10 left-20 flex flex-col gap-2`}>
            {filterOptions.map((filter) => (
              <div
                className={`${filter.style} ${styles.themeButtonNoBg} py-1 px-2 border rounded-full text-xs`}
                onClick={() => setFiltBy(filter.value)}
              >
                {filter.lable}
              </div>
            ))}
          </div>
          <Star className={`star1 fixed z-20 top-[10%] right-[20%] h-14`} />
          <Star className={`star2 fixed z-20 bottom-[6%] right-[16%] h-24`} />
          <Star className={`star3 fixed z-20 bottom-[4%] left-[20%] h-10`} />
          <div
            className={`graph-clip grow h-full bg-stone-300 texture border border-stone-500`}
          >
            <NetworkGraph
              filtBy={filtBy}
              fontSizeNum={fontSizeNum}
              userNotes={profile.notes}
            />
          </div>
        </div>
      </div>
      <AiAssistant
        titles={titles}
        recentNotes={recentNotes}
        summeries={summeries}
        setSummeries={setSummeries}
      />
    </div>
  );
};

export default GraphView;
