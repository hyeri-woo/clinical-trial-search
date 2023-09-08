import { Sick } from '../types';
import React, { createContext, useContext } from 'react';

export interface SearchContextType {
  isFocus: boolean;
  keyword: string;
  suggestions: Sick[];
  recentKeyword: string[];
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  resetKeyword: () => void;
  storeRecentKeyword: (keyword: string) => void;
  changeFocus: () => void;
  changeBlur: (event: React.FocusEvent<HTMLElement>) => void;
  changeKeyword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setKeywordManual: (keyword: string) => void;
  keyboardEvent: (event: React.KeyboardEvent<HTMLInputElement | HTMLUListElement>) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export default SearchContext;
export const useSearch = () => useContext(SearchContext) as SearchContextType;
