import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {CreateRoutes} from './routes/CreateRoutes';


ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
      <CreateRoutes/>
    </React.StrictMode>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

