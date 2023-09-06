import { Disease } from '../types';
import SelectItem from './SelectItem';
import { styled } from 'styled-components';
import React, { useState } from 'react';

const SEARCH_LIMIT = 10;

type SelectListProps = {
  isKeywordTyped: boolean;
  diseases: Disease[];
};

export default function SelectList({ isKeywordTyped, diseases }: SelectListProps) {
  const [current, setCurrent] = useState<number>(0);
  const ArrowKeyDown = (e: React.KeyboardEvent) => {
    const length = diseases.length < 10 ? diseases.length : 10;
    if (e.key === 'ArrowUp' && current > 0) {
      setCurrent((prev) => prev - 1);
    }
    if (e.key === 'ArrowDown' && current < length - 1) {
      setCurrent((prev) => prev + 1);
    }
    const buttons = (e.target as HTMLElement).closest('ul')?.querySelectorAll('button');
    if (buttons) {
      buttons[current].focus();
    }
  };
  return (
    <StyledList onKeyDown={ArrowKeyDown} tabIndex={0}>
      <li>
        {!isKeywordTyped && '검색어 없음'}
        {isKeywordTyped && diseases.length === 0 && '추천 검색어 없음'}
        {isKeywordTyped && diseases.length > 0 && '추천 검색어'}
      </li>
      {isKeywordTyped &&
        diseases.length > 0 &&
        diseases.slice(0, SEARCH_LIMIT).map((disease) => {
          return (
            <li key={disease.sickCd}>
              <SelectItem>{disease.sickNm}</SelectItem>
            </li>
          );
        })}
    </StyledList>
  );
}

const StyledList = styled.ul`
  background: var(--color-white20);
  border-radius: 50px;
  padding: 30px;
  border: 1px solid white;
  li:nth-child(2) {
    margin-top: 10px;
  }
`;
