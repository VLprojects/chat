/* eslint-disable import/prefer-default-export */
import { IServerPoll, IServerPollOption } from '../containers/CreatePollPage/types';
import Poll from '../keystone/chat/poll';
import { APP_ID, rootDivAttrAppId, rootDivAttrChatId, rootDivAttrApiUrl } from '../types/const';

export const findAppInitialData = (): {
  channelIdFromAttr?: string | null;
  appIdFromAttr?: string | null;
  apiUrlFromAttr?: string | null;
} => {
  const element = document.getElementById(APP_ID);
  const channelIdFromAttr = element?.getAttribute(rootDivAttrChatId);
  const appIdFromAttr = element?.getAttribute(rootDivAttrAppId);
  const apiUrlFromAttr = element?.getAttribute(rootDivAttrApiUrl);

  return { channelIdFromAttr, appIdFromAttr, apiUrlFromAttr };
};

// TODO Refactor - we work only with model since it converted and created from server data only once
export const convertServerPollToModel = (poll: IServerPoll): Poll => {
  const options: IServerPollOption[] = [];
  const validOptions: string[] = [];
  let withAnswer = false;

  poll.options.forEach((option) => {
    options.push(option);
    if (option.valid) {
      validOptions.push(option.option);
      withAnswer = true;
    }
  });

  withAnswer = poll.withAnswer;

  return new Poll({ ...poll, id: `${poll.id}`, options, validOptions, withAnswer });
};
