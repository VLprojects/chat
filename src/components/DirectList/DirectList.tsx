import { Typography } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import useKeystone from '../../keystone';
import Routes from '../../routes';
import { Avatar } from '../../ui-kit';
import { getChatWithUser, getDirectChannelName } from './service';
import useStyles from './styles';

type TDirectListUser = {
  id: string;
  username: string;
  about: string;
  online: string;
};

const DirectList: FC = (props) => {
  const classes = useStyles();
  const root = useKeystone();
  // const [filteredList, setFilteredList] = useState(getDirectChannelList(root));

  const clickRowHandler = (channelId: string) => () => {
    root.ui.setRoute(`${Routes.Channels}/${channelId}`);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ flexGrow: 1 }}>
        {root.chat.directChannelsList.map((channel) => (
          <div key={channel.id} className={classes.row} onClick={clickRowHandler(channel.id)}>
            <Avatar url={getChatWithUser(root, channel.id)?.avatarUrl} size="large" />
            <Typography className={classes.channelTitle}>{getDirectChannelName(root, channel.id)}</Typography>
          </div>
        ))}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default observer(DirectList);
