import { createContext } from 'react';
import { ContextProps } from './interfaces';
import { Shows } from './types';
import { searchKey, basicPageSize } from './constant';

const previousSearch = localStorage.getItem(searchKey)
  ? localStorage.getItem(searchKey)
  : '';

export const defaultContext: ContextProps = {
  search: previousSearch,
  pageSize: basicPageSize,
};

export const SearchContext = createContext(defaultContext);
export const DataContext = createContext<null | Shows>(null);
