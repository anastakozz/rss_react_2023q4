import { createContext } from 'react';
import { ContextProps } from './interfaces';
const previousSearch = localStorage.getItem('previousSearch')
  ? localStorage.getItem('previousSearch')
  : '';
const pageSize = localStorage.getItem('pageSize')
  ? localStorage.getItem('pageSize')
  : '10';

export const defaultContext: ContextProps = {
  search: previousSearch,
  pageSize,
};
export const SearchContext = createContext(defaultContext);
