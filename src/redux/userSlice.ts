import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorSwal, InfoSwal, SuccessSwal, WarningSwal } from '../utils/CustomSwal';
import { auth, firestore } from '../utils/firebase';
import { sampleNote } from '../utils/sampleText';
import { RootState } from './store';
import { NoteType } from './types';

interface CustomUser {
  uid: string;
  accessToken: string;
}

const initialState = {
  profile : {
    email: '',
    name: '',
    id: '',
    notes: [] as NoteType[],
    isLogin: false,
    orderBy:{time:'newest',record:'edit'},
  },
  isLoading:false,
  toggleMenu:false,
  fontSize:5,
}

const sortNotes = (notes: NoteType[], orderBy:{time:string,record:string}) => {
  switch (orderBy.time) {
    case 'newest':
      return orderBy.record === 'create'
        ? notes.sort((a, b) => b.create_time - a.create_time)
        : notes.sort((a, b) => b.edit_time - a.edit_time);
    case 'oldest':
      return orderBy.record === 'create'
        ? notes.sort((a, b) => a.create_time - b.create_time)
        : notes.sort((a, b) => a.edit_time - b.edit_time);
    default:
      return notes;
  }
};

export const signUpAsync = createAsyncThunk(
  'user/signUp',
  async ({ email, password, name }:{email:string;password:string;name:string}) => {
    try {
      const user = await auth.signUp(email, password);
      const id = user.uid;
      localStorage.setItem('id',JSON.stringify(id));
      await firestore.addUser(id,name,email);
      return {email, name, id};
    } catch (error:any) {
      throw new Error(error.message);
    }
  }
);

export const loginAsync = createAsyncThunk(
  'user/login',
  async ({ email, password }:{email:string;password:string}) => {
    try {
      const user = await auth.login(email, password);
      const { uid } = user as unknown as CustomUser;
      localStorage.setItem('id',JSON.stringify(uid));
      const doc = await firestore.getUser(uid);
      if (!doc) {
        throw new Error('User document not found');
      }
      let {name, notes} = doc;
      const reOrderNotes = notes.sort((a:NoteType,b:NoteType)=>b.edit_time - a.edit_time);
      return {email, id:uid , name, notes:reOrderNotes};
    } catch (error:any) {
      throw new Error(error.message);
    }
  }
);

export const loginViaLocalAsync = createAsyncThunk(
  'user/loginViaLocal',
  async ({ id }:{id:string}) => {
    try {
      const doc = await firestore.getUser(id);
      if (!doc) {
        throw new Error('User document not found');
      }
      const {name, notes, email} = doc;
      const reOrderNotes = notes.sort((a:NoteType,b:NoteType)=>b.edit_time - a.edit_time);
      return {email, id , name, notes:reOrderNotes};
    } catch (error:any) {
      throw new Error(error.message);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      localStorage.removeItem('id');
      await auth.logout();
    } catch (error:any) {
      throw new Error(error.message);
    }
  }
);

const userSlice = createSlice({
  name : 'user',
  initialState : initialState,
  reducers:{
    setToggleMenu: (state, action:PayloadAction<boolean>) => {
      state.toggleMenu = action.payload;
    },
    addNote: (state, action: PayloadAction<NoteType>) => {
      const order = state.profile.orderBy.time
      if (state.profile.notes.findIndex(note => note.id === action.payload.id ) >= 0){
        WarningSwal.fire({
          text: '您已收藏過此篇筆記',
        })
        return
      }
      let addedNote = {...action.payload}
      if(action.payload.title === ''){
        addedNote.title='未命名標題';
      }
      order === 'newest'? state.profile.notes.unshift(addedNote): state.profile.notes.push(addedNote);
      const id = state.profile.id
      const data = {
        email: state.profile.email,
        name: state.profile.name,
        notes: state.profile.notes,
      }
      firestore.updateUser(id, data);
      action.payload.category === 'shared'? SuccessSwal.fire({
        title: '收藏筆記',
        text: `您已收藏${addedNote.sharedBy}的筆記`,
      }) : SuccessSwal.fire({
        title: '新增筆記',
        text: `已新增 ${addedNote.title} 至 ${addedNote.category==='sermon'?'聚會崇拜':'個人靈修'}`,
      })
    },
    deleteNote:(state,action:PayloadAction<string>) => {
      if(state.profile.notes.length === 1){
        WarningSwal.fire({
          text: '請保留一篇筆記',
        })
        return
      }
      state.profile.notes = state.profile.notes.filter(note => note.id !== action.payload);
      const id = state.profile.id
      const data = {
        email: state.profile.email,
        name: state.profile.name,
        notes: state.profile.notes,
      }
      firestore.updateUser(id, data);
    },
    editNote:(state, action: PayloadAction<NoteType>)=>{
      let editedNote = {...action.payload}
      if(action.payload.title === ''){
        editedNote.title='未命名標題';
      }
      const editId = action.payload.id;
      const noteIndex = state.profile.notes.findIndex(note => note.id === editId);
      state.profile.notes[noteIndex] = editedNote;
      const id = state.profile.id
      const data = {
        email: state.profile.email,
        name: state.profile.name,
        notes: state.profile.notes,
      }
      firestore.updateUser(id, data);
      InfoSwal.fire({
        title: '筆記已修改',
        text: `已更新 ${editedNote.title} 筆記內容!`,
      })
    },
    changeOrderByTime:(state)=>{
      state.profile.orderBy.time =( state.profile.orderBy.time === 'newest') ? 'oldest' : 'newest';
      sortNotes(state.profile.notes,state.profile.orderBy);
    },
    changeOrderByRecord:(state)=>{
      state.profile.orderBy.record = (state.profile.orderBy.record === 'create') ? 'edit' : 'create';
      sortNotes(state.profile.notes,state.profile.orderBy);
    },
    incrementFontSize:(state)=>{
      if (state.fontSize >= 10) {
        return
      }
      state.fontSize += 1;
    },
    decrementFontSize:(state)=>{
      if (state.fontSize === 1) {
        return
      }
      state.fontSize -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsync.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.profile.email = action.payload?.email ??"";
        state.profile.id = action.payload?.id ??"";
        state.profile.name = action.payload?.name ??"";
        state.profile.notes = [{
          id:'admin-tutorial',
          category:'admin',
          link_notes: [],
          create_time: 1,
          edit_time: 1,
          title:'教學筆記',
          content:sampleNote}
          ]
        state.profile.isLogin = true;
        state.isLoading = false;
      })
      .addCase(signUpAsync.rejected, (state) => {
        ErrorSwal.fire({
          title: '註冊失敗',
          text: '請檢查帳號/密碼的完整性',
        })
        state.isLoading = false;
      })
      .addCase(loginAsync.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.profile.email = action.payload?.email ??"";
        state.profile.id = action.payload?.id ??"";
        state.profile.name = action.payload?.name ??"";
        state.profile.notes = action.payload?.notes ??[];
        state.profile.isLogin = true;
        state.isLoading = false;
      })
      .addCase(loginAsync.rejected, (state) => {
        ErrorSwal.fire({
          title: '登入失敗',
          text: '請檢查帳號/密碼是否正確?',
        })
        state.isLoading = false;
      })
      .addCase(loginViaLocalAsync.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(loginViaLocalAsync.fulfilled, (state, action) => {
        state.profile.email = action.payload?.email ??"";
        state.profile.id = action.payload?.id ??"";
        state.profile.name = action.payload?.name ??"";
        state.profile.notes = action.payload?.notes ??[];
        state.profile.isLogin = true;
        state.isLoading = false;
      })
      .addCase(loginViaLocalAsync.rejected, () => {
        ErrorSwal.fire({
          text: '網路發生錯誤',
        })
      })
      .addCase(logoutAsync.pending,(state)=>{
        state.isLoading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.profile.email = "";
        state.profile.id = "";
        state.profile.name = "";
        state.profile.notes = [];
        state.profile.isLogin = false;
        state.isLoading = false;
      })
      .addCase(logoutAsync.rejected, () => {
        ErrorSwal.fire({
          text: '網路發生錯誤',
        })
      })
  },
})
export const selectProfile = (state: RootState) => state.user.profile;
export const selectIsLoading = (state:RootState) => state.user.isLoading;
export const selectFontSize = (state:RootState) => state.user.fontSize;
export const selectIsToggleMenu = (state:RootState) => state.user.toggleMenu;
export const { setToggleMenu, addNote, deleteNote, editNote, changeOrderByTime, changeOrderByRecord, incrementFontSize, decrementFontSize } = userSlice.actions
export default userSlice.reducer;