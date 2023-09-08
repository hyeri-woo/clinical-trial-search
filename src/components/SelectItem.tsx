import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { styled } from 'styled-components';
import { useSearch } from '../context/SearchContext';

type SelectItemProps = {
  children: React.ReactNode;
};

export default function SelectItem({ children }: SelectItemProps) {
  const { setKeywordManual } = useSearch();

  const changeInputValue = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const keyword = (event.target as HTMLElement).textContent;
    if (keyword) {
      setKeywordManual(keyword);
    }
  };

  return (
    <StyledItem type='button' onMouseDown={changeInputValue}>
      <FaSearch size='12' color='white' />
      <span>{children}</span>
    </StyledItem>
  );
}

const StyledItem = styled.button`
  font-size: 15px;
  margin-top: 5px;
  padding: 10px;
  width: 100%;
  text-align: start;
  border-radius: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  svg {
    margin-right: 10px;
  }
  &:hover {
    background: var(--color-white20);
  }
`;
