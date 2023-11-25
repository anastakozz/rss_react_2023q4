import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from "next-redux-wrapper";
import { showsApi } from './api';

export const store = () => configureStore({
  reducer: {
    [showsApi.reducerPath]: showsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(showsApi.middleware),
});

export default store;

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(store, { debug: true });