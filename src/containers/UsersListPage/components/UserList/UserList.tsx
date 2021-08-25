import { observer } from 'mobx-react-lite';
import React, { FC, useMemo, useState } from 'react';
import { Avatar, Image, Input } from 'ui-kit';
import ChatUsersIcon from 'ui-kit/assets/icons/chat-users.svg';
import IconSearch from 'ui-kit/assets/icons/icon-search.svg';
import SendMessageIcon from 'ui-kit/assets/icons/send-message-icon.svg';
import useKeystone from '../../../../keystone';
import User from '../../../../keystone/chat/user';
import { createOrOpenDirectChat } from '../../services';
import useStyles from './styles';

const UserList: FC = () => {
  const classes = useStyles();

  const root = useKeystone();
  const { chat, settings } = root;

  const [search, setSearch] = useState('');
  const [showLoader, setShowLoader] = useState<Record<string, boolean>>({});
  const users = chat.userList;

  const filteredUsers = useMemo(
    () => (search ? users.filter((user) => user.displayName.includes(search)) : users),
    [search],
  );
  const openNewChat = (chatWithUser: User) => () => {
    try {
      setShowLoader((state) => ({ ...state, [chatWithUser.id]: true }));
      createOrOpenDirectChat(root, chatWithUser);
    } finally {
      setShowLoader((state) => ({ ...state, [chatWithUser.id]: false }));
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.inputSearch}>
        <Input placeholder="Search" onChange={(v) => setSearch(v)} value={search} />
        <button type="button">
          <Image src={IconSearch} alt="" />
        </button>
      </div>
      <div className={classes.userCounter}>
        <Image src={ChatUsersIcon} alt="" />
        <span style={{ marginLeft: 8 }}>{filteredUsers.length}</span>
      </div>
      <div className={classes.userListWrapper}>
        {filteredUsers.map((user) => (
          <div className={classes.userRow} key={user.id}>
            <Avatar size="large" url={user?.avatarUrl} />

            <div key={user.id} style={{ marginLeft: 9 }}>
              {user.displayName}
            </div>
            {settings.displayDirect && (
              <div className={classes.sendMessageBtn} id="sendMessageBtn" onClick={openNewChat(user)}>
                {showLoader[user.id] ? 'Loading' : <Image src={SendMessageIcon} alt="" />}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(UserList);
