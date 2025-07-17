import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import './global.scss';
import { MemberProvider } from './context/memberContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <MemberProvider>
            <App />
        </MemberProvider>
    </StrictMode>
);
