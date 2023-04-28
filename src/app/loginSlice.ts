import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { auth, firestore } from '../utils/firebase';
import { NoteType } from './types';
import Swal from 'sweetalert2';

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
    fontSize:'small',
  },
  isLoading:false
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
        text: `您已收藏${action.payload.sharedBy}的筆記`,
        background:'#f5f5f4',
      }) : Swal.fire({
        icon: 'success',
        title: '新增筆記',
        text: `已新增筆記 ${action.payload.title}`,
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
    changeDisplayFontSize:(state,action:PayloadAction<string>)=>{
      state.profile.fontSize = action.payload;
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
          content:'<h2>自動輸入經文</h2><p><br></p><p>請以 "聖經簡寫"接著"卷":"節" 按下空格後,就會自動輸入經文了！</p><p>舉例:</p><p>羅 1:2-5 </p><p>[2]這福音是神從前藉眾先知在聖經上所應許的，[3]論到他兒子─我主耶穌基督。按肉體說，是從大衛後裔生的；[4]按聖善的靈說，因從死裡復活，以大能顯明是神的兒子。[5]我們從他受了恩惠並使徒的職分，在萬國之中叫人為他的名信服真道</p><p><br></p><h2>聖經簡寫列表-舊約</h2><ol><li>創世記:創</li><li>出埃及記:出</li><li>利未記:利</li><li>民數記:民</li><li>申命記:申</li><li>約書亞記:書</li><li>士師記:士</li><li>路得記:得</li><li>撒母耳記上:撒上</li><li>撒母耳記下:撒下</li><li>列王紀上:王上</li><li>列王紀下:王下</li><li>歷代志上:代上</li><li>歷代志下:代下</li><li>以斯拉記:拉</li><li>尼希米記:尼</li><li>以斯帖記:斯</li><li>約伯記:伯</li><li>詩篇:詩</li><li>箴言:箴</li><li>傳道書:傳</li><li>雅歌:歌</li><li>以賽亞書:賽</li><li>耶利米書:耶</li><li>耶利米哀歌:哀</li><li>以西結書:結</li><li>但以理書:但</li><li>何西阿書:何</li><li>約珥書:珥</li><li>阿摩司書:摩</li><li>俄巴底亞書:俄</li><li>約拿書:拿</li><li>彌迦書:彌</li><li>那鴻書:鴻</li><li>哈巴谷書:哈</li><li>西番雅書:番</li><li>哈該書:該</li><li>撒迦利亞書:亞</li><li>瑪拉基書:瑪</li></ol><p><br></p><p><br></p><h2>聖經簡寫列表-新約</h2><ol><li>馬太福音:太</li><li>馬可福音:可</li><li>路加福音:路</li><li>約翰福音;約</li><li>使徒行傳:徒</li><li>羅馬書:羅</li><li>哥林多前書:林前</li><li>哥林多後書:林後</li><li>加拉太書:加</li><li>以弗所書:弗</li><li>腓立比書:腓</li><li>歌羅西書:西</li><li>帖撒羅尼迦前書:帖前</li><li>帖撒羅尼迦後書:帖後</li><li>提摩太前書:提前</li><li>提摩太後書:提後</li><li>提多書:多</li><li>腓利門書:門</li><li>希伯來書:來</li><li>雅各書:雅</li><li>彼得前書:彼前</li><li>彼得後書:彼後</li><li>約翰一書:約壹</li><li>約翰二書:約貳</li><li>約翰三書:約叁</li><li>猶大書:猶</li><li>啟示錄:啟</li></ol>'}
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
export const { addNote, deleteNote, editNote, changeOrderByTime, changeOrderByRecord, changeDisplayFontSize } = loginSlice.actions
export default loginSlice.reducer;