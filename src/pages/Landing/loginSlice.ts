import { createSlice } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
const initialState = {
  profile : {
    name: '',
    email: '',
    isLogin: false,
  }
}

const loginSlice = createSlice({
  name : 'user',
  initialState : initialState,
  reducers:{
    setLogin: (state, action) => {
      const{name, email} = action.payload;
      state.profile = {
        name,
        email,
        isLogin: true,
      };
    },
    setLogout: (state) => {
      state.profile = {
        ...initialState.profile,
      };
    },
  }
})
export const selectIsLogin = (state: RootState) => state.login.profile;
export const {setLogin, setLogout} = loginSlice.actions
export default loginSlice.reducer;