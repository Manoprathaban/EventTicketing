import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { AnyAction } from 'redux';
import authReducer from './slices/authSlice';
import eventReducer from './slices/eventSlice';
import ticketReducer from './slices/ticketSlice';
import { RootState } from '../types';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    tickets: ticketReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type TypedDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

// Create a typed version of useDispatch
export const useAppDispatch = () => useDispatch<TypedDispatch>();

export default store; 