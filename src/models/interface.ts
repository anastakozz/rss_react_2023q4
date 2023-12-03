export interface IFormInput {
  name: string;
  age: number;
  email: string;
  gender: string;
  password: string;
  repeatedPassword: string;
  picture: FileList;
  terms?: boolean;
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
}
