import { Sick } from '../types';
import SelectItem from './SelectItem';
import { styled } from 'styled-components';
import useArrowKeyDown from '../hooks/useArrowKeyDown';

const SEARCH_LIMIT = 10;

type SelectListProps = {
  isKeywordTyped: boolean;
  suggestions: Sick[];
};

export default function SelectList({ isKeywordTyped, suggestions }: SelectListProps) {
  const ArrowKeyDown = useArrowKeyDown({ suggestions });
  return (
    <StyledList onKeyDown={ArrowKeyDown} tabIndex={0}>
      <li>
        {!isKeywordTyped && '검색어 없음'}
        {isKeywordTyped && suggestions.length === 0 && '추천 검색어 없음'}
        {isKeywordTyped && suggestions.length > 0 && '추천 검색어'}
      </li>
      {isKeywordTyped &&
        suggestions.length > 0 &&
        suggestions.slice(0, SEARCH_LIMIT).map((suggestion) => {
          return (
            <li key={suggestion.sickCd}>
              <SelectItem>{suggestion.sickNm}</SelectItem>
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
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.25);
  li:nth-child(2) {
    margin-top: 10px;
  }
`;
