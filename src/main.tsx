import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import TextInput from './components/ChatText/TextInput.tsx';
import Chat from './components/Chat/Chat.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      
      <App/>
  </StrictMode>
);
