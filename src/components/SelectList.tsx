import React from 'react';
import { Disease } from '../types';
import SelectItem from './SelectItem';
import { styled } from 'styled-components';

type SelectListProps = {
  diseaseList: Disease[];
};

export default function SelectList({ diseaseList }: SelectListProps) {
  return (
    <StyledList>
      <li>
        <span>추천 검색어</span>
      </li>
      {diseaseList.map((disease) => {
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
  li:nth-child(1) {
    margin-bottom: 10px;
  }
`;
