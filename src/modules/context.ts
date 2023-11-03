import { createContext } from 'react';
export const defaultContext = {
  search: '',
  pageSize: '10',
};
export const SearchContext = createContext(defaultContext);
