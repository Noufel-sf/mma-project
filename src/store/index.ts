import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import challengesReducer from './slices/challengesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    challenges: challengesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
