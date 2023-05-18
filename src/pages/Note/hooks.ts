import { useEffect, useState } from "react";
import { NoteType, ProfileType } from '../../redux/types';
import { WarningSwal } from '../../utils/CustomSwal';

interface Referenced {
    linkTitle: string;
    linkId: string;
  }
  
export const useCurrentNote = (profile: ProfileType, id?: string) => {
    const [currentNote, setCurrentNote] = useState<NoteType>({
      id: '',
      title: '',
      content: '',
      category: '',
      link_notes: [],
      create_time: 1,
      edit_time: 1,
    });
    const [referenced, setReferenced] = useState<Referenced[]>([]);
    const [shareLink, setShareLink] = useState('');
  
    useEffect(() => {
      if (profile.notes.length === 0) {
        return;
      }
  
      const matchNote = profile.notes.find((note) => note.id === id);
      if (matchNote) {
        setCurrentNote(matchNote);
        setShareLink(
          `https://manna-jar.web.app/?category=shared&shareBy=${profile.id}&shareNote=${matchNote.id}`
        );
      } else {
        setCurrentNote({
          id: '',
          title: '找不到這篇筆記',
          content: '筆記可能被刪除,或向分享者索取該筆記',
          category: 'admin',
          link_notes: [],
          create_time: 1,
          edit_time: 1,
        });
        WarningSwal.fire({
          title: '找不到這篇筆記',
          text: '筆記可能被刪除,或向分享者索取該筆記',
        });
      }
  
      const referencedBy: Referenced[] = [];
      profile.notes.map((note) =>
        note.link_notes?.map((link) => {
          if (link.id === id) {
            referencedBy.push({ linkTitle: note.title, linkId: note.id });
          }
        })
      );
      setReferenced(referencedBy);
    }, [profile, id]);
  
    return { currentNote, referenced, shareLink };
  };