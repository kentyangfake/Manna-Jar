import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { auth, firestore } from '../../utils/firebase';

interface CustomUser {
  uid: string;
  accessToken: string;
}

const initialState = {
  profile : {
    email: '',
    name: '',
    id: '',
    notes: [],
    isLogin: false,
  }
}

export const signUpAsync = createAsyncThunk(
  'user/signUp',
  async ({ email, password, name }:{email:string;password:string;name:string}) => {
    try {
      const user = await auth.signUp(email, password);
      const id = user.uid;
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
      const { uid, accessToken } = user as unknown as CustomUser;
      console.log(accessToken);
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
  async ({ token }:{token:string;}) => {
    try {
      const user = await auth.loginViaLocal(token);
      const id = user.uid;
      const doc = await firestore.getUser(id);
      if (!doc) {
        throw new Error('User document not found');
      }
      const {email, name, notes} = doc ?? {email:'',name:'',notes:[]};
      return {email, id, name, notes};
    } catch (error:any) {
      throw new Error(error.message);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await auth.logout();
    } catch (error:any) {
      throw new Error(error.message);
    }
  }
);

const loginSlice = createSlice({
  name : 'user',
  initialState : initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.profile.email = action.payload?.email ??"";
        state.profile.id = action.payload?.id ??"";
        state.profile.name = action.payload?.name ??"";
        state.profile.isLogin = true;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.profile.email = action.payload?.email ??"";
        state.profile.id = action.payload?.id ??"";
        state.profile.name = action.payload?.name ??"";
        state.profile.notes = action.payload?.notes ??[];
        state.profile.isLogin = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        
      })
      .addCase(loginViaLocalAsync.fulfilled, (state, action) => {
        state.profile.email = action.payload?.email ??"";
        state.profile.id = action.payload?.id ??"";
        state.profile.name = action.payload?.name ??"";
        state.profile.notes = action.payload?.notes ??[];
        state.profile.isLogin = true;
      })
      .addCase(loginViaLocalAsync.rejected, (state, action) => {
        
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.profile.email = "";
        state.profile.id = "";
        state.profile.name = "";
        state.profile.notes = [];
        state.profile.isLogin = false;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        
      })
  },
})
export const selectProfile = (state: RootState) => state.login.profile;
// export const {} = loginSlice.actions
export default loginSlice.reducer;