import React, { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectProfile } from '../../app/loginSlice';
import { useParams } from 'react-router-dom';
import { NoteType } from '../../app/types';

const Note = () => {
  const profile = useAppSelector(selectProfile);
  //TODO:用id找到對應筆記
  const { id } = useParams();
  const [currentNote, setCurrentNote] = useState<NoteType>({
    id: '',
    title: '',
    content: '',
    category: '',
    link_notes: [],
    create_time: '',
    edit_time: '',
  });
  console.log(id);

  return (
    <>
      <div>Hi I'm Note</div>
    </>
  );
};

export default Note;
