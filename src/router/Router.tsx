import App from '../App';
import Home from '../pages/Home';
import { createBrowserRouter } from 'react-router-dom';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
    errorElement: <NotFound />,
  },
]);
