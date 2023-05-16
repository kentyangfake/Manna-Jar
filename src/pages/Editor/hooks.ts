import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { NoteType, ProfileType } from '../../redux/types';

export const useEditNote = (profile: ProfileType, id?: string) => {
    const [isEdit, setIsEdit] = useState(false);
    const [note, setNote] = useState<NoteType>({
      id: uuidv4(),
      title: '',
      content: '',
      category: id === 'newNoteDevotion' ? 'devotion' : 'sermon',
      link_notes: [],
      create_time: new Date().getTime(),
      edit_time: new Date().getTime(),
    });
  
    useEffect(() => {
      if (!profile.isLogin) {
        return;
      }
  
      if (id !== 'newNote' && id !== 'newNoteDevotion') {
        const currentNote = profile.notes.find((note) => note.id === id);
        setIsEdit(true);
        setNote(currentNote!);
      }
    }, [profile.isLogin, isEdit]);
  
    return { note, isEdit, setNote };
  };