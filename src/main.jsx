import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './routes/AppRoutes.jsx';
import './App.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
