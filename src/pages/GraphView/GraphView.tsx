import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import NetworkGraph from '../../components/NetworkGraph';
import { openAI } from '../../utils/openAI';
import { useAppSelector } from '../../app/hooks';
import { selectProfile } from '../../app/loginSlice';

const GraphWrapper = styled.div`
  width: 1280px;
  height: 800px;
  border: 1px solid pink;
`;

const GraphView = () => {
  const profile = useAppSelector(selectProfile);
  const [titles, setTitles] = useState<string[]>([]);
  const [recentNotes, setRecentNotes] = useState<string[]>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [summeries, setSummeries] = useState('');

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
    const res = await openAI.summerize(titles, recentNotes);
    setIsAiTyping(false);
    setSummeries(res);
  };

  return (
    <>
      <div>
        <GraphWrapper>
          <NetworkGraph />
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
