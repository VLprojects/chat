import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import { Chat } from './Chat';
import { APP_ID } from './types/const';

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <Chat
        apiToken={process.env.REACT_APP_API_TOKEN}
        userToken={process.env.REACT_APP_USER_TOKEN}
        channelId={process.env.REACT_APP_CHANNEL_ID}
      />
    </div>
  </React.StrictMode>,
  document.getElementById(APP_ID),
);
