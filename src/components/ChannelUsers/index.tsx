import React, { FC } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import {
  Checkbox,
  Input,
  Image,
  Avatar,
} from 'ui-kit';
import IconSearch from 'ui-kit/assets/icons/icon-search.svg';

import { TUser } from 'types/users';

import styles from './ChannelsUsers.module.scss';

interface IChannelUsers {
  list: TUser[];
}

const ChannelUsers: FC<IChannelUsers> = (props) => {
  const { list } = props;

  return (
    <div className={styles.usersList}>
      <div className={styles.inputSearch}>
        <Input placeholder="Search" />
        <button type="button">
          <Image src={IconSearch} alt="" />
        </button>
      </div>
      {/* <div className={styles.buttons}>
        <button type="button">
          <Image src={IconUsers} alt="" />
          99 991
        </button>
        <button type="button">
          <Image src={IconBasket} alt="" />
          Block users
        </button>
      </div> */}
      <div className={styles.list}>
        <Scrollbars>
          {list.map((item: any) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.checkbox}>
                <Checkbox />
              </div>
              <div className={styles.wrapper}>
                <div className={styles.avatar}>
                  <Avatar username={item.username} url={item.avatarUrl} />
                </div>
                <div className={styles.username}>{item.username}</div>
              </div>
            </div>
          ))}
        </Scrollbars>
      </div>
    </div>
  );
};

export default ChannelUsers;
