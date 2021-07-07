/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { Chat } from './Chat';

import './App.scss';

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <Chat
        apiToken={process.env.REACT_APP_API_TOKEN}
        username={process.env.REACT_APP_USERNAME}
        channelId={Number(process.env.REACT_APP_CHANNEL_ID)}
      />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
