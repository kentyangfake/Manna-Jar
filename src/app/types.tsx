export interface NoteType {
  id: string;
  title: string;
  content: string;
  category: string;
  link_notes: LinkObj[] | [];
  //使用Unix Timestamp
  create_time: number;
  edit_time: number;
  sharedBy?: string;
}

export interface LinkObj {
  id: string;
  title: string;
}