export interface IFormInput {
  name: string;
  age: number;
  email: string;
  gender: string;
  password: string;
  repeatedPassword: string;
  picture: FileList;
  terms?: boolean;
  country: string;
}

export interface rawData {
  name: string | undefined;
  age: number | undefined;
  email: string | undefined;
  gender: string | undefined;
  terms: boolean | undefined;
  password: string | undefined;
  repeatedPassword: string | undefined;
  picture: FileList | undefined | null;
  country: string | undefined;
}

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

export interface CardsState {
  cards: CardData[];
}
