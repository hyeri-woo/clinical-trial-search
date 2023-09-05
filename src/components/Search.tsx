import SearchForm from './SearchForm';
import SelectList from './SelectList';
import { styled } from 'styled-components';

const diseaseList = [
  { sickCd: 'hello', sickNm: 'hello' },
  { sickCd: 'hello', sickNm: 'hello' },
  { sickCd: 'hello', sickNm: 'hello' },
  { sickCd: 'hello', sickNm: 'hello' },
  { sickCd: 'hello', sickNm: 'hello' },
  { sickCd: 'hello', sickNm: 'hello' },
  { sickCd: 'hello', sickNm: 'hello' },
  { sickCd: 'hello', sickNm: 'hello' },
  { sickCd: 'hello', sickNm: 'hello' },
  { sickCd: 'hello', sickNm: 'hello' },
];

export default function Search() {
  return (
    <StyledLayout>
      <SearchForm />
      <SelectList diseaseList={diseaseList} />
    </StyledLayout>
  );
}

const StyledLayout = styled.div`
  max-width: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 150px;
`;
