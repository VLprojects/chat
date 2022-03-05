import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

export default new Sentry.BrowserClient({
  dsn: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SENTRY_DSN : undefined,
  release: process.env.REACT_APP_VERSION || 'unknown',
  environment: process.env.NODE_ENV || 'unknown',
  ignoreErrors: ['ResizeObserver loop limit exceeded'],
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});