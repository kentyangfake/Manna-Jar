import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { auth, firestore } from '../utils/firebase';

interface CustomUser {
  uid: string;
  accessToken: string;
}

interface Profile {
  email: string;
  name: string;
  id: string;
  notes: Note[];
  isLogin: boolean;
}

interface Note {
  id: string,
  title: string,
  content: string,
  category: string,
  link_notes: any[] | [],
  create_time: string,
  edit_time: string,
}

const initialState = {
  profile : {
    email: '',
    name: '',
    id: '',
    notes: [] as Note[],
    isLogin: false,
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
      const {name, notes} = doc;
      return {email, id:uid , name, notes};
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
      return {email, id , name, notes};
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
    addNote: (state, action: PayloadAction<Note>) => {
      state.profile.notes.push(action.payload as Note);
      const id = state.profile.id
      const data = {
        email: state.profile.email,
        name: state.profile.name,
        notes: state.profile.notes,
      }
      firestore.updateUser(id, data);
    },
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
export const { addNote } = loginSlice.actions
export default loginSlice.reducer;