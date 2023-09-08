import React, { useCallback, useEffect, useRef, useState } from 'react';
import SearchContext, { SearchContextType } from './SearchContext';
import { getSearchResult } from '../api/search';
import useDebounce from '../hooks/useDebounce';
import { Sick } from '../types';
import SessionStorage from '../storage/sessionStorage';

interface SearchProviderProps {
  children: React.ReactNode;
}
export default function SearchProvider({ children }: SearchProviderProps) {
  const [isFocus, setIsFocus] = useState(true);
  const [keyword, setKeyword] = useState(() => '');
  const [suggestions, setSuggestions] = useState<Sick[]>(() => []);
  const debouncedKeyword = useDebounce({ value: keyword, delay: 300 });
  const [selectIndex, setSelectIndex] = useState<number>(-1);
  const [recentKeyword, setRecentKeyword] = useState<string[]>(() => []);
  const sessionStorage = new SessionStorage();
  const SESSION_RECENT_KEYWORD = 'recentKeyword';
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSearchResult(debouncedKeyword);
      setSuggestions(res);
    };
    if (debouncedKeyword !== '') {
      fetchData();
    }
  }, [debouncedKeyword]);

  useEffect(() => {
    const keyword = getRecentKeyword();
    setRecentKeyword(keyword);
  }, []);

  const changeKeyword = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setKeyword(inputValue);
    if (!inputValue) {
      setSuggestions([]);
      return;
    }
  };

  const setKeywordManual = (keyword: string) => {
    setKeyword(keyword);
  };

  const changeFocus = () => {
    setIsFocus(true);
  };

  const changeBlur = (event: React.FocusEvent<HTMLElement>) => {
    setIsFocus(false);
  };

  const resetKeyword = () => {
    setKeyword('');
    setSuggestions([]);
  };

  const keyboardEvent = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;
    if (event.key === 'ArrowDown' || event.key === 'Tab') {
      event.preventDefault();
      setSelectIndex((prev) => {
        const idx = prev < suggestions.length - 1 ? prev + 1 : 0;
        setKeyword(suggestions[idx].sickNm);
        return idx;
      });
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectIndex((prev) => {
        const idx = prev < suggestions.length - 1 ? prev + 1 : suggestions.length - 1;
        setKeyword(suggestions[idx].sickNm);
        return idx;
      });
    } else if (event.key === 'Enter') {
      selectIndex !== -1 && setSuggestions((prev) => [prev[selectIndex]]);
      setSelectIndex(-1);
    }
  }, []);

  const getRecentKeyword = () => {
    const recentKeyword = sessionStorage.get(SESSION_RECENT_KEYWORD);
    if (!recentKeyword) {
      return [];
    }
    return recentKeyword;
  };

  const storeRecentKeyword = (keyword: string) => {
    const recentKeyword = sessionStorage.get(SESSION_RECENT_KEYWORD);
    if (!recentKeyword) {
      sessionStorage.save(SESSION_RECENT_KEYWORD, [keyword]);
      setRecentKeyword([keyword]);
    } else {
      const newList = recentKeyword.filter((item: string) => item !== keyword);
      newList.unshift(keyword);
      sessionStorage.save(SESSION_RECENT_KEYWORD, newList.slice(0, 5));
      setRecentKeyword(newList.slice(0, 5));
    }
  };

  const contextValue: SearchContextType = {
    isFocus,
    keyword,
    suggestions,
    recentKeyword,
    inputRef,
    resetKeyword,
    storeRecentKeyword,
    changeFocus,
    changeBlur,
    changeKeyword,
    setKeywordManual,
    keyboardEvent,
  };

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
}
