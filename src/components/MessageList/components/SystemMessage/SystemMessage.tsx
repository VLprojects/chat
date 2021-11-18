import { Grid, Typography } from '@mui/material';
import useKeystone from 'keystone';
import User from 'keystone/chat/user';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { Avatar } from 'ui-kit';
import useCommonStyles from '../../styles';

interface ISystemMessageProps {
  user: User;
}

const SystemMessage: FC<ISystemMessageProps> = (props) => {
  const { user } = props;
  const { chat } = useKeystone();

  const userObserver = chat.users.get(user.id);

  const commonClasses = useCommonStyles();

  return (
    <Grid container alignItems="center">
      <Grid
        item
        component={Avatar}
        name={userObserver?.displayName}
        src={userObserver?.avatarUrl}
        size="lg"
        avatarColor={user?.avatarColor}
      />

      <Grid item className={commonClasses.message}>
        <Typography variant="body2" fontWeight={600} component="span">
          {userObserver?.displayName}
        </Typography>
        <Typography variant="body2" component="span" sx={{ marginLeft: '4px' }}>
          <FormattedMessage id="joined" />
        </Typography>
      </Grid>
    </Grid>
  );
};

export default observer(SystemMessage);
