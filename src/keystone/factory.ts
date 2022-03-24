import { IRUser } from 'types/serverResponses';

import User from './chat/user';

export const createUserFactory = (user: IRUser) =>
  new User({
    id: String(user.id),
    username: user.username,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    role: user.role,
  });
