import { createContext } from 'react';
import { ContextProps } from './interfaces';
const previousSearch = localStorage.getItem('previousSearch')
  ? localStorage.getItem('previousSearch')
  : '';

export const defaultContext: ContextProps = {
  search: previousSearch,
  pageSize: '10',
};
export const SearchContext = createContext(defaultContext);
