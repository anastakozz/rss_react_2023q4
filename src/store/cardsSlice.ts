import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardsState, CardData } from '../models/interface';

const initialState: CardsState = {
  cards: [],
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    updateCards(state, action: PayloadAction<CardData>) {
      state.cards.push(action.payload);
    },
  },
});

export const { updateCards } = cardsSlice.actions;

export default cardsSlice.reducer;
