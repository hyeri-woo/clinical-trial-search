import App from '../App';
import Home from '../pages/Home';
import { createBrowserRouter } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import SearchProvider from '../context/SearchProvider';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <SearchProvider>
            <Home />
          </SearchProvider>
        ),
      },
    ],
    errorElement: <NotFound />,
  },
]);
