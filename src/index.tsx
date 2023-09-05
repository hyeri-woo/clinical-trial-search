import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/Router';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<RouterProvider router={router} />);

reportWebVitals();
