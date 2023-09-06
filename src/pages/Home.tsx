import React, { useEffect, useState } from 'react';
import { getKeyword } from '../api/search';
import { Disease } from '../types';
import SearchForm from '../components/SearchForm';
import SelectList from '../components/SelectList';
import { styled } from 'styled-components';

export default function Home() {
  const [diseases, setDiseases] = useState<Disease[]>(() => []);
  const [keyword, setKeyword] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await getKeyword(keyword);
      setDiseases(res);
    };
    fetchData();
  }, [keyword]);

  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  console.log(diseases);
  return (
    <StyledLayout>
      <h1>
        국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기{' '}
      </h1>
      <SearchForm changeKeyword={changeKeyword} />
      <SelectList isKeywordTyped={keyword !== ''} diseases={diseases} />
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
