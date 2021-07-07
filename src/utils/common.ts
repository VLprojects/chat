/* eslint-disable import/prefer-default-export */
import { APP_ID, rootDivAttrApiToken, rootDivAttrChatId } from '../types/const';

export const findAppInitialData = (): { channelIdFromAttr?: string | null; apiTokenFromAttr?: string | null } => {
  const rootDiv = document.getElementById(APP_ID);
  const channelIdFromAttr = rootDiv?.getAttribute(rootDivAttrChatId);
  const apiTokenFromAttr = rootDiv?.getAttribute(rootDivAttrApiToken);

  return { channelIdFromAttr, apiTokenFromAttr };
};
