import React from 'react';
import ReactDOM from 'react-dom';
import { Chat } from './Chat';
import { APP_ID } from './types/const';

ReactDOM.render(
  <React.StrictMode>
    <Chat
      appId={process.env.REACT_APP_APP_ID}
      userToken={process.env.REACT_APP_USER_TOKEN}
      channelId={process.env.REACT_APP_CHANNEL_ID}
    />
  </React.StrictMode>,
  document.getElementById(APP_ID),
);
