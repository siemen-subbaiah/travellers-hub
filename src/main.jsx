import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'leaflet/dist/leaflet.css';
import { BrowserRouter } from 'react-router-dom';
import AuthState from './context/auth/AuthState.jsx';
import CommonState from './context/common/CommonState.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthState>
        <CommonState>
          <App />
        </CommonState>
      </AuthState>
    </BrowserRouter>
  </React.StrictMode>
);
