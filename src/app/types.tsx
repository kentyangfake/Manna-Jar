export interface NoteType {
  id: string;
  title: string;
  content: string;
  category: string;
  link_notes: LinkObj[] | [];
  create_time: string;
  edit_time: string;
}

export interface LinkObj {
  id: string;
  title: string;
}
