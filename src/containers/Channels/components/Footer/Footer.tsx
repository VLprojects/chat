import { Typography } from '@material-ui/core';
import React, { FC } from 'react';
import ChatUsersIcon from 'ui-kit/icons/ChatUsersIcon';
import useKeystone from '../../../../keystone';
import Routes from '../../../../routes';
import useStyles from './styles';

const Footer: FC = () => {
  const classes = useStyles();
  const root = useKeystone();

  return (
    <div className={classes.root}>
      <div className={classes.buttonWrapper} onClick={() => root.ui.setRoute(Routes.Profile)}>
        <ChatUsersIcon />
        <Typography>Profile</Typography>
      </div>

      <div className={classes.buttonWrapper} onClick={() => root.ui.setRoute(Routes.Users)}>
        <ChatUsersIcon />
        <Typography>Users</Typography>
      </div>
    </div>
  );
};

export default Footer;
