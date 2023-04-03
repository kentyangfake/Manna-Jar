import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { auth, firestore } from '../../utils/firebase';

const initialState = {
  profile : {
    email: '',
    name: '',
    id: '',
    isLogin: false,
  }
}

export const signUpAsync = createAsyncThunk(
  'user/signUp',
  async ({ email, password, name }:{email:string;password:string;name:string}) => {
    try {
      const user = await auth.signUp(email, password);
      const id = user.uid;
      await firestore.addUser(id);
      return {email, name, id};
    } catch (error) {

    }
  }
);

export const loginAsync = createAsyncThunk(
  'user/login',
  async ({ email, password }:{email:string;password:string}) => {
    try {
      const user = await auth.login(email, password);
      const id = user.uid;
      return {email, id};
    } catch (error) {

    }
  }
);

export const logoutAsync = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await auth.logout();
    } catch (error) {

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
        state.profile.email = action.payload?.email ??""
        state.profile.isLogin = true;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.profile.email = action.payload?.email ??""
        state.profile.isLogin = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.profile.email = "";
        state.profile.id = "";
        state.profile.name = "";
        state.profile.isLogin = false;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        
      })
  },
})
export const selectProfile = (state: RootState) => state.login.profile;
// export const {} = loginSlice.actions
export default loginSlice.reducer;