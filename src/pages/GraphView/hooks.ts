import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ProfileType } from '../../redux/types';

export const useRecentNote = (profile: ProfileType) => {
    const navigate = useNavigate();
    const [titles, setTitles] = useState<string[]>([]);
    const [recentNotes, setRecentNotes] = useState<string[]>([]);
    const [summaries, setSummaries] = useState('讓AI幫你回顧最近的筆記吧!');
  
    useEffect(() => {
      if (!profile.isLogin) {
        navigate('/');
      }
  
      if (profile.notes.length < 6) {
        setSummaries('累積5篇筆記後解鎖此功能。');
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
  
    return { recentNotes, titles, summaries, setSummaries };
  };