import SearchForm from '../components/SearchForm';
import SelectList from '../components/SelectList';
import { styled } from 'styled-components';
import { useSearch } from '../context/SearchContext';

export default function Home() {
  const { isFocus, changeFocus, changeBlur } = useSearch();
  return (
    <StyledLayout>
      <h1>
        국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기{' '}
      </h1>
      <main tabIndex={0} onFocus={changeFocus} onBlur={changeBlur}>
        <SearchForm />
        {isFocus && <SelectList />}
      </main>
      {}
    </StyledLayout>
  );
}

const StyledLayout = styled.div`
  max-width: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 130px;
  h1 {
    text-align: center;
    margin-bottom: 15px;
  }
  main form {
    margin-bottom: 10px;
  }
`;
