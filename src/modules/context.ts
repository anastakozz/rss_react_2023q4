import { createContext } from 'react';
import { Shows } from './types';

export const DataContext = createContext<null | Shows>(null);
