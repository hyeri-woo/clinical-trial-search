import React, { useEffect, useState } from 'react';
import { getSearchResult } from '../api/search';
import { Sick } from '../types';
import SearchForm from '../components/SearchForm';
import SelectList from '../components/SelectList';
import { styled } from 'styled-components';
import useDebounce from '../hooks/useDebounce';

export default function Home() {
  const [suggestions, setsuggestions] = useState<Sick[]>(() => []);
  const [keyword, setKeyword] = useState<string>('');
  const debouncedKeyword = useDebounce({ value: keyword, delay: 500 });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSearchResult(debouncedKeyword);
      setsuggestions(res);
    };
    if (debouncedKeyword !== '') {
      fetchData();
    }
  }, [debouncedKeyword]);

  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <StyledLayout>
      <h1>
        국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기{' '}
      </h1>
      <SearchForm changeKeyword={changeKeyword} />
      <SelectList isKeywordTyped={debouncedKeyword !== ''} suggestions={suggestions} />
      {}
    </StyledLayout>
  );
}

const StyledLayout = styled.div`
  max-width: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 130px;
  h1 {
    text-align: center;
    margin-bottom: 15px;
  }
`;
