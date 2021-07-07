/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import { Chat } from './Chat';
import { APP_ID } from './types/const';

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <Chat />
    </div>
  </React.StrictMode>,
  document.getElementById(APP_ID)
);
