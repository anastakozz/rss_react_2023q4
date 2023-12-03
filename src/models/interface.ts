export interface IFormInput {
    name: string;
    age: number;
    email: string;
    gender: string;
    password: string;
    repeatedPassword?: string | undefined;
    picture: File;
    terms?: boolean | undefined;
  }