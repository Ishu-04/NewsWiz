import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { LanguageProvider } from './context/LanguageContext';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> 
    <LanguageProvider> {/* ✅ Only one router wrapper */}
      <App />
      </LanguageProvider> 
    </BrowserRouter>
  </React.StrictMode>,
);

