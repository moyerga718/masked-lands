import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { MaskedLands } from './components/MaskedLands';
import './fonts/earthorbiter.ttf'
import './fonts/ANGARSRUNES_PERSONAL.TTF'
import './fonts/CINZELDECORATIVE-REGULAR.TTF'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MaskedLands />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
