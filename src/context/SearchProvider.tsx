import React, { useState } from 'react';
import SearchContext, { SearchContextType } from './SearchContext';
import { getSearchResult } from '../api/search';
import useDebounce from '../hooks/useDebounce';

interface SearchProviderProps {
  children: React.ReactNode;
}
export default function SearchProvider({ children }: SearchProviderProps) {
  const [keyword, setKeyword] = useState(() => '');
  const [suggestions, setSuggestions] = useState(() => []);
  const debouncedKeyword = useDebounce({ value: keyword, delay: 500 });

  const changeKeyword = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setKeyword(inputValue);
    if (!inputValue) {
      setSuggestions([]);
      return;
    }
    const res = await getSearchResult(debouncedKeyword);
    setSuggestions(res);
  };

  const contextValue: SearchContextType = {
    keyword,
    suggestions,
    changeKeyword,
  };

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
}
