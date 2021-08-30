/* eslint-disable import/prefer-default-export */
import { APP_ID, rootDivAttrAppId, rootDivAttrChatId } from '../types/const';

export const findAppInitialData = (): { channelIdFromAttr?: string | null; appIdFromAttr?: string | null } => {
  const element = document.getElementById(APP_ID);
  const channelIdFromAttr = element?.getAttribute(rootDivAttrChatId);
  const appIdFromAttr = element?.getAttribute(rootDivAttrAppId);

  return { channelIdFromAttr, appIdFromAttr };
};
