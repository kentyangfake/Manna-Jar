import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';

export const store = configureStore({
  reducer:{
    login: loginReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
