import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import NotFound from './components/NotFound.jsx';
import DetailedInfo from './components/DetailedInfo.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<App />} />
      <Route path="/details" element={<DetailedInfo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
