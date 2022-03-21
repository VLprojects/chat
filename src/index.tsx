import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import { Chat } from './Chat';
import { APP_ID } from './types/const';

const Index: FC = () => {
  const [channelId, setChannelId] = useState(process.env.REACT_APP_CHANNEL_ID);

  return (
    <React.StrictMode>
      <Chat
        appId={process.env.REACT_APP_APP_ID}
        userToken={process.env.REACT_APP_USER_TOKEN}
        channelId={channelId}
      />
    </React.StrictMode>
  );
};

ReactDOM.render(<Index />, document.getElementById(APP_ID));
