import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { auth, firestore } from '../utils/firebase';
import { NoteType } from './types';
import Swal from 'sweetalert2';
import { sampleNote } from '../utils/sampleNote';

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

const loginSlice = createSlice({
  name : 'user',
  initialState : initialState,
  reducers:{
    setToggleMenu: (state, action:PayloadAction<boolean>) => {
      state.toggleMenu = action.payload;
    },
    addNote: (state, action: PayloadAction<NoteType>) => {
      const order = state.profile.orderBy.time
      //handle already had note
      if (state.profile.notes.findIndex(note => note.id === action.payload.id ) >= 0){
        Swal.fire({
          icon: 'warning',
          text: '您已收藏過此篇筆記',
          background:'#f5f5f4',
        })
        return
      }
      //handle added note without title
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
      action.payload.category === 'shared'? Swal.fire({
        icon: 'success',
        title: '收藏筆記',
        text: `您已收藏${addedNote.sharedBy}的筆記`,
        background:'#f5f5f4',
      }) : Swal.fire({
        icon: 'success',
        title: '新增筆記',
        text: `已新增 ${addedNote.title} 至 ${addedNote.category==='sermon'?'聚會崇拜':'個人靈修'}`,
        background:'#f5f5f4',
      })
    },
    deleteNote:(state,action:PayloadAction<string>) => {
      if(state.profile.notes.length === 1){
        Swal.fire({
          icon: 'warning',
          text: '請保留一篇筆記',
          background:'#f5f5f4',
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
      //handle added note without title
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
      Swal.fire({
        icon: 'info',
        title: '筆記已修改',
        text: `已更新 ${editedNote.title} 筆記內容!`,
        background:'#f5f5f4',
      })
    },
    changeOrderByTime:(state)=>{
      state.profile.orderBy.time === 'newest'? state.profile.orderBy.time = 'oldest' : state.profile.orderBy.time = 'newest';
      if(state.profile.orderBy.record === 'create'){
        switch(state.profile.orderBy.time){
          case 'newest':
            state.profile.notes.sort((a,b)=>b.create_time - a.create_time);
            break;
          case 'oldest':
            state.profile.notes.sort((a,b)=>a.create_time - b.create_time);
            break;
          default:
            state.profile.notes.sort((a,b)=>b.create_time - a.create_time);
        }
      } else {
        switch(state.profile.orderBy.time){
          case 'newest':
            state.profile.notes.sort((a,b)=>b.edit_time - a.edit_time);
            break;
          case 'oldest':
            state.profile.notes.sort((a,b)=>a.edit_time - b.edit_time);
            break;
          default:
            state.profile.notes.sort((a,b)=>b.edit_time - a.edit_time);
        }
      }
    },
    changeOrderByRecord:(state)=>{
      state.profile.orderBy.record === 'create'? state.profile.orderBy.record = 'edit' : state.profile.orderBy.record = 'create';
      if(state.profile.orderBy.record === 'create'){
        switch(state.profile.orderBy.time){
          case 'newest':
            state.profile.notes.sort((a,b)=>b.create_time - a.create_time);
            break;
          case 'oldest':
            state.profile.notes.sort((a,b)=>a.create_time - b.create_time);
            break;
          default:
            state.profile.notes.sort((a,b)=>b.create_time - a.create_time);
        }
      } else {
        switch(state.profile.orderBy.time){
          case 'newest':
            state.profile.notes.sort((a,b)=>b.edit_time - a.edit_time);
            break;
          case 'oldest':
            state.profile.notes.sort((a,b)=>a.edit_time - b.edit_time);
            break;
          default:
            state.profile.notes.sort((a,b)=>b.edit_time - a.edit_time);
        }
      }
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
      .addCase(signUpAsync.rejected, (state, action) => {
        Swal.fire({
          icon: 'error',
          title: '註冊失敗',
          text: '請檢查帳號/密碼的完整性',
          background:'#f5f5f4',
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
      .addCase(loginAsync.rejected, (state, action) => {
        Swal.fire({
          icon: 'error',
          title: '登入失敗',
          text: '請檢查帳號/密碼是否正確?',
          background:'#f5f5f4',
        })
        state.isLoading = false;
      })
      .addCase(loginViaLocalAsync.fulfilled, (state, action) => {
        state.profile.email = action.payload?.email ??"";
        state.profile.id = action.payload?.id ??"";
        state.profile.name = action.payload?.name ??"";
        state.profile.notes = action.payload?.notes ??[];
        state.profile.isLogin = true;
      })
      .addCase(loginViaLocalAsync.rejected, (state, action) => {
        console.log("rejected!");
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.profile.email = "";
        state.profile.id = "";
        state.profile.name = "";
        state.profile.notes = [];
        state.profile.isLogin = false;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        console.log("rejected!");
      })
  },
})
export const selectProfile = (state: RootState) => state.login.profile;
export const selectIsLoading = (state:RootState) => state.login.isLoading;
export const selectFontSize = (state:RootState) => state.login.fontSize;
export const selectIsToggleMenu = (state:RootState) => state.login.toggleMenu;
export const { setToggleMenu, addNote, deleteNote, editNote, changeOrderByTime, changeOrderByRecord, incrementFontSize, decrementFontSize } = loginSlice.actions
export default loginSlice.reducer;