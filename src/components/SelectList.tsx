import SelectItem from './SelectItem';
import { styled } from 'styled-components';
import useArrowKeyDown from '../hooks/useArrowKeyDown';
import { useSearch } from '../context/SearchContext';
import RecentSearchList from './RecentSearchList';

const SEARCH_LIMIT = 10;

export default function SelectList() {
  const { suggestions } = useSearch();

  // const isKeywordEmpty = keyword === '';
  const ArrowKeyDown = useArrowKeyDown({ suggestions });
  return (
    <StyledDiv>
      <RecentSearchList />
      <StyledSection onKeyDown={ArrowKeyDown}>
        <h2>추천 검색어</h2>
        <ul>
          {suggestions.length === 0
            ? '없음'
            : suggestions.slice(0, SEARCH_LIMIT).map((suggestion) => {
                return (
                  <li key={suggestion.sickCd}>
                    <SelectItem>{suggestion.sickNm}</SelectItem>
                  </li>
                );
              })}
        </ul>
      </StyledSection>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  background: var(--color-white20);
  border-radius: 50px;
  padding: 30px;
  border: 1px solid white;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.25);
`;

const StyledSection = styled.section`
  padding-top: 10px;
  h2 {
    font-size: 16px;
    padding-bottom: 10px;
  }
`;
