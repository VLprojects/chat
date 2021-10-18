/* eslint-disable import/prefer-default-export */
import { IServerPoll, IServerPollOption } from '../containers/CreatePollPage/types';
import Poll from '../keystone/chat/poll';
import { APP_ID, rootDivAttrAppId, rootDivAttrChatId } from '../types/const';

export const findAppInitialData = (): { channelIdFromAttr?: string | null; appIdFromAttr?: string | null } => {
  const element = document.getElementById(APP_ID);
  const channelIdFromAttr = element?.getAttribute(rootDivAttrChatId);
  const appIdFromAttr = element?.getAttribute(rootDivAttrAppId);

  return { channelIdFromAttr, appIdFromAttr };
};

export const convertServerPollToModel = (poll: IServerPoll): Poll => {
  if (!poll) throw new Error('No poll');
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

  return new Poll({ ...poll, id: `${poll.id}`, options, validOptions, withAnswer });
};
