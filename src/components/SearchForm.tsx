import React from 'react';
import { styled } from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { useSearch } from '../context/SearchContext';

export default function SearchForm() {
  const { keyword, inputRef, changeKeyword, keyboardEvent, storeRecentKeyword, resetKeyword } = useSearch();

  const searchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    storeRecentKeyword(keyword);
    resetKeyword();
    window.alert(`${keyword}를 입력하셨습니다!`);
  };

  return (
    <StyledForm onSubmit={searchSubmit}>
      <label>
        <input
          type='text'
          name='keyword'
          value={keyword}
          onChange={changeKeyword}
          onKeyDown={keyboardEvent}
          autoFocus
          autoComplete='off'
          ref={inputRef}
        />
        <FaSearch size='24' color='white' />
      </label>
      <button type='submit' disabled={keyword === ''}>
        검색
      </button>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  position: relative;
  label {
    position: relative;
    svg {
      position: absolute;
      top: 0;
      left: 20px;
    }
  }
  input {
    width: 100%;
    border-radius: 50px;
    border: 1px solid white;
    background: var(--color-white30);
    font-size: 15px;
    padding: 30px 130px 30px 55px;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.25);
  }
  button {
    width: 20%;
    position: absolute;
    top: 0;
    right: 0;
    background: var(--color-white20);
    color: white;
    font-size: 15px;
    height: 100%;
    border-radius: 0 50px 50px 0;
    &:not(:disabled):hover {
      background: var(--color-white70);
      color: var(--color-blue);
    }
    &:disabled {
      cursor: initial;
    }
  }
`;
