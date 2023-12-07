import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './cardsSlice';
import countriesReducer from './countriesSlice';

const store = configureStore({
  reducer: {
    cards: cardsReducer,
    countries: countriesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
