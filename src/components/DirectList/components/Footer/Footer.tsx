import React, { FC } from 'react';
import { Image } from 'ui-kit';
import ChatUsersIcon from 'ui-kit/assets/icons/chat-users.svg';
import Routes from '../../../../routes';
import useKeystone from '../../../../keystone';
import useStyles from './styles';

const Footer: FC = () => {
  const classes = useStyles();
  const root = useKeystone();

  return (
    <div className={classes.root}>
      <div className={classes.buttonWrapper} onClick={() => root.ui.setRoute(Routes.Profile)}>
        <Image src={ChatUsersIcon} alt="" />
        <span>Profile</span>
      </div>

      <div className={classes.buttonWrapper} onClick={() => root.ui.setRoute(Routes.Users)}>
        <Image src={ChatUsersIcon} alt="" />
        <span>Users</span>
      </div>
    </div>
  );
};

export default Footer;
