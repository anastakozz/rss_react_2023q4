import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CardData = {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  terms?: boolean;
  picture: string | ArrayBuffer | null;
  country?: string;
};

interface CardsState {
  cards: CardData[];
}

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
