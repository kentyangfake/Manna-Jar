import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import NetworkGraph from '../../components/NetworkGraph';
import { openAI } from '../../utils/openAI';
import { useAppSelector } from '../../app/hooks';
import { selectProfile } from '../../app/loginSlice';
import SizePicker from '../../components/SizePicker';

const GraphWrapper = styled.div`
  position: relative;
  width: 1000px;
  height: 600px;
  border: 1px solid pink;
`;
const FilterDiv = styled.div`
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  background-color: beige;
`;

const GraphView = () => {
  const profile = useAppSelector(selectProfile);
  const [titles, setTitles] = useState<string[]>([]);
  const [recentNotes, setRecentNotes] = useState<string[]>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [summeries, setSummeries] = useState('');
  const [filtBy, setFiltBy] = useState('all');

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
    <>
      <div>
        <SizePicker />
        <GraphWrapper>
          <FilterDiv>
            <div onClick={() => setFiltBy('all')}>全部筆記</div>
            <div onClick={() => setFiltBy('sermon')}>聚會崇拜</div>
            <div onClick={() => setFiltBy('devotion')}>個人靈修</div>
            <div onClick={() => setFiltBy('shared')}>分享收藏</div>
          </FilterDiv>
          <NetworkGraph filtBy={filtBy} />
        </GraphWrapper>
        {isAiTyping ? (
          ''
        ) : (
          <button onClick={handleAiResponse}>ai信仰回顧</button>
        )}
        {isAiTyping ? <div>ai回答中...</div> : ''}
        <p>{summeries}</p>
      </div>
    </>
  );
};

export default GraphView;
