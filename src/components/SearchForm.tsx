import { styled } from 'styled-components';
import { FaSearch } from 'react-icons/fa';

export default function SearchForm() {
  return (
    <StyledForm>
      <label>
        <input type='text' name='d' autoFocus />
        <FaSearch size='24' color='white' />
      </label>
      <button type='submit'>검색</button>
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
    &:hover {
      background: var(--color-white70);
      color: var(--color-blue);
    }
  }
`;
