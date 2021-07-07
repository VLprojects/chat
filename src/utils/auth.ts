import cookies from 'js-cookie';

import { Cookie } from 'types/const';

export const getStoredAccessToken = (): string | undefined => cookies.get(Cookie.ACCESS_TOKEN);

export const storeAccessToken = (accessToken: string): void => {
  if (accessToken) {
    cookies.set(Cookie.ACCESS_TOKEN, accessToken, {
      expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // 1 year
    });
  }
};

export default null;
