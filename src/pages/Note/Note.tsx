import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectProfile } from '../../app/loginSlice';
import { useParams } from 'react-router-dom';
import { NoteType } from '../../app/types';
import { Link } from 'react-router-dom';
import NetworkGraph from '../../components/NetworkGraph';

interface Referenced {
  linkTitle: string;
  linkId: string;
}

const Note = () => {
  const profile = useAppSelector(selectProfile);
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
  const [referenced, setReferenced] = useState<Referenced[]>([]);

  useEffect(() => {
    if (profile.notes.length === 0) {
      return;
    }

    const matchNote = profile.notes.find((note) => note.id === id);
    if (matchNote) {
      setCurrentNote(matchNote);
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

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div>{currentNote.title}</div>
      <div dangerouslySetInnerHTML={{ __html: currentNote.content }}></div>
      <div>Referenced by:</div>
      {referenced?.map((note) => (
        <Link to={`/note/${note.linkId}`} key={note.linkId}>
          {note.linkTitle}
        </Link>
      ))}
      <div
        style={{ width: '300px', height: '300px', border: '1px solid black' }}
      >
        <NetworkGraph />
      </div>
    </div>
  );
};

export default Note;
