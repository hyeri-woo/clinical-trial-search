import React from 'react';
import { styled } from 'styled-components';
import GlobalStyle from '../styles/GlobalStyles';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <StyledLayout>
      <GlobalStyle />
      <h1>404 접근할 수 없는 페이지입니다.</h1>
      <button type='button' onClick={() => navigate('/')}>
        홈으로 돌아가기
      </button>
    </StyledLayout>
  );
}

const StyledLayout = styled.article`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 400px;
  background: var(--color-white20);
  border-radius: 50px;
  padding: 30px;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  gap: 60px;
  button {
    width: 70%;
    background: var(--color-white20);
    padding: 15px;
    border-radius: 30px;
    &:hover {
      background: var(--color-white70);
      color: var(--color-blue);
    }
  }
`;
