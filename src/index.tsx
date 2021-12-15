import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ReactDOM from 'react-dom';
import { FormattedMessage } from 'react-intl';
import { Chat } from './Chat';
import { APP_ID } from './types/const';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={({ error, resetErrorBoundary }) => <FormattedMessage id="globalError" />}>
      <Chat
        appId={process.env.REACT_APP_APP_ID}
        userToken={process.env.REACT_APP_USER_TOKEN}
        channelId={process.env.REACT_APP_CHANNEL_ID}
      />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById(APP_ID),
);
