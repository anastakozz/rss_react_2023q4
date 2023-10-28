import { createContext } from 'react';
export const defaultContext = { search: 'lalala', userInput: '' };
export const SearchContext = createContext(defaultContext);
