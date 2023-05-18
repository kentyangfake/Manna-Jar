export interface ProfileType {
  email: string;
  name: string;
  id: string;
  notes: NoteType[];
  isLogin: boolean;
  orderBy: { time: string; record: string };
}

export interface NoteType {
  id: string;
  title: string;
  content: string;
  category: string;
  link_notes: LinkObj[] | [];
  create_time: number;
  edit_time: number;
  sharedBy?: string;
}

export interface LinkObj {
  id: string;
  title: string;
}
