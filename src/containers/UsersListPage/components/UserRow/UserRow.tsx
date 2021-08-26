import React, { useState } from 'react';
import { Avatar, Image } from 'ui-kit';
import SendMessageIcon from 'ui-kit/assets/icons/send-message-icon.svg';
import User from '../../../../keystone/chat/user';
import useStyles from './styles';

interface IProps {
  user: User;
  displayDirect: boolean;
  openNewChat: (user: User) => Promise<void>;
}
const UserRow: React.FC<IProps> = (props) => {
  const { user, displayDirect, openNewChat } = props;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const clickHandler = async () => {
    try {
      setLoading(true);
      await openNewChat(user);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.userRow} key={user.id}>
      <Avatar size="large" url={user?.avatarUrl} />

      <div key={user.id} style={{ marginLeft: 9 }}>
        {user.displayName}
      </div>
      {displayDirect && (
        <div className={classes.sendMessageBtn} id="sendMessageBtn" onClick={clickHandler}>
          {loading ? 'Loading' : <Image src={SendMessageIcon} alt="" />}
        </div>
      )}
    </div>
  );
};

export default UserRow;
