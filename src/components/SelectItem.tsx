import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { styled } from 'styled-components';

type SelectItemProps = {
  children: React.ReactNode;
};

export default function SelectItem({ children }: SelectItemProps) {
  return (
    <StyledItem type='button'>
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
