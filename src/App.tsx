import { Outlet } from 'react-router-dom';
import './App.css';
import GlobalStyle from './styles/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyle />
      <Outlet />
    </>
  );
}

export default App;
