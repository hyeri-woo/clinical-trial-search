import { Sick } from '../types';
import React, { createContext, useContext } from 'react';

export interface SearchContextType {
  keyword: string;
  suggestions: Sick[];
  changeKeyword: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export default SearchContext;
export const useSearch = () => useContext(SearchContext) as SearchContextType;
