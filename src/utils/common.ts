/* eslint-disable import/prefer-default-export */
import { APP_ID, rootDivAttrApiToken, rootDivAttrChatId } from '../types/const';

export const findAppInitialData = (): { channelIdFromAttr?: string | null; apiTokenFromAttr?: string | null } => {
  const element = document.getElementById(APP_ID);
  const channelIdFromAttr = element?.getAttribute(rootDivAttrChatId);
  const apiTokenFromAttr = element?.getAttribute(rootDivAttrApiToken);

  return { channelIdFromAttr, apiTokenFromAttr };
};
