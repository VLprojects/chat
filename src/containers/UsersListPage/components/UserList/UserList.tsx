import { observer } from 'mobx-react-lite';
import React, { FC, useMemo, useState } from 'react';
import { Avatar, Image, Input } from 'ui-kit';
import ChatUsersIcon from 'ui-kit/assets/icons/chat-users.svg';
import IconSearch from 'ui-kit/assets/icons/icon-search.svg';
import SendMessageIcon from 'ui-kit/assets/icons/send-message-icon.svg';
import useKeystone from '../../../../keystone';
import { IRUser } from '../../../../types/serverResponses';
import useStyles from './styles';

const UserList: FC = () => {
  const classes = useStyles();

  const { chat, ui } = useKeystone();
  const channelId = String(ui.params.id);

  const getChannelUsers = () => {
    const currentChannel = chat.channels.get(channelId);
    return currentChannel ? currentChannel.users.map((userRef) => userRef.current) : [];
  };

  const [search, setSearch] = useState('');

  const filteredUsers: Partial<IRUser>[] = useMemo(
    () => [{ displayName: 'a', id: '1' }],
    // search ? users.filter((user: User) => user.username.includes(search) || user.displayName.includes(search)) : [],
    [search],
  );

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
        {filteredUsers.map((item) => (
          <div className={classes.userRow} key={item.id}>
            <Avatar size="large" url={item?.avatarUrl} />

            <div key={item.id} style={{ marginLeft: 9 }}>
              {item.displayName}
            </div>
            <div className={classes.sendMessageBtn} id="sendMessageBtn">
              <Image src={SendMessageIcon} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(UserList);
