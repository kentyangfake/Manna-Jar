import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { auth, firestore } from '../utils/firebase';
import { NoteType } from './types';

interface CustomUser {
  uid: string;
  accessToken: string;
}

interface Profile {
  email: string;
  name: string;
  id: string;
  notes: NoteType[];
  isLogin: boolean;
}

const initialState = {
  profile : {
    email: '',
    name: '',
    id: '',
    notes: [] as NoteType[],
    isLogin: false,
    orderBy:{time:'newest',record:'edit'},
  }
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
    addNote: (state, action: PayloadAction<NoteType>) => {
      const order = state.profile.orderBy.time
      if (state.profile.notes.findIndex(note => note.id === action.payload.id ) >= 0){
        alert('您已收藏此筆記!');
        return
      }
      order === 'newest'? state.profile.notes.unshift(action.payload as NoteType): state.profile.notes.push(action.payload as NoteType);
      const id = state.profile.id
      const data = {
        email: state.profile.email,
        name: state.profile.name,
        notes: state.profile.notes,
      }
      firestore.updateUser(id, data);
      action.payload.category === 'shared'? window.alert(`您已收藏${action.payload.sharedBy}的筆記`): window.alert(`新增筆記:${action.payload.title}`)
    },
    deleteNote:(state,action:PayloadAction<string>) => {
      if(state.profile.notes.length === 1){
        window.alert('請保留至少一篇筆記!');
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
      const editId = action.payload.id;
      const noteIndex = state.profile.notes.findIndex(note => note.id === editId);
      state.profile.notes[noteIndex] = action.payload;
      const id = state.profile.id
      const data = {
        email: state.profile.email,
        name: state.profile.name,
        notes: state.profile.notes,
      }
      firestore.updateUser(id, data);
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.profile.email = action.payload?.email ??"";
        state.profile.id = action.payload?.id ??"";
        state.profile.name = action.payload?.name ??"";
        state.profile.isLogin = true;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        console.log("rejected!");
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.profile.email = action.payload?.email ??"";
        state.profile.id = action.payload?.id ??"";
        state.profile.name = action.payload?.name ??"";
        state.profile.notes = action.payload?.notes ??[];
        state.profile.isLogin = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        console.log("rejected!");
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
export const { addNote, deleteNote, editNote, changeOrderByTime, changeOrderByRecord } = loginSlice.actions
export default loginSlice.reducer;