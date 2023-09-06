import { Disease } from '../types';
import SelectItem from './SelectItem';
import { styled } from 'styled-components';

const SEARCH_LIMIT = 10;

type SelectListProps = {
  isKeywordTyped: boolean;
  diseases: Disease[];
};

export default function SelectList({ isKeywordTyped, diseases }: SelectListProps) {
  return (
    <StyledList>
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
