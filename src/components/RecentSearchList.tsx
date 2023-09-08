import React from 'react';
import { styled } from 'styled-components';
import { useSearch } from '../context/SearchContext';

export default function RecentSearchList() {
  const { inputRef, recentKeyword, setKeywordManual } = useSearch();

  const changeInputValue = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const keyword = (event.target as HTMLElement).textContent;
    if (keyword) {
      setKeywordManual(keyword);
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <StyledSection>
      <h2>최근 검색어</h2>
      <ul>
        {recentKeyword.length === 0
          ? '없음'
          : recentKeyword.map((keyword: string, index) => {
              return (
                <li key={index}>
                  <button type='button' onMouseDown={changeInputValue}>
                    {keyword}
                  </button>
                </li>
              );
            })}
      </ul>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  border-bottom: 0.5px solid white;
  padding-bottom: 10px;
  h2 {
    font-size: 16px;
    padding-bottom: 10px;
  }
  ul {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    button {
      border: 0.5px solid var(--color-white70);
      padding: 3px 8px;
      border-radius: 10px;
      box-shadow: 0px 0px 6px 0px rgba(255, 255, 255, 0.3);
      &:hover {
        background: var(--color-white20);
      }
    }
  }
`;
