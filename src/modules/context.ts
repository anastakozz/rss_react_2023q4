import { createContext } from 'react';
import { ContextProps } from './interfaces';
import { Shows } from './types';
const previousSearch = localStorage.getItem('previousSearch')
  ? localStorage.getItem('previousSearch')
  : '';

export const defaultContext: ContextProps = {
  search: previousSearch,
  pageSize: '12',
};

export const SearchContext = createContext(defaultContext);
export const DataContext = createContext<null | Shows>(null);
