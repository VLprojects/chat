import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import useKeystone from '../../../../keystone';
import Routes from '../../../../routes';
import useStyles from './styles';

const Footer: FC = () => {
  const classes = useStyles();
  const root = useKeystone();

  return (
    <div className={classes.root}>
      <div className={classes.buttonWrapper} onClick={() => root.ui.setRoute(Routes.Profile)}>
        <PersonIcon />
        <Typography variant="body2">
          <FormattedMessage id="profile" />
        </Typography>
      </div>

      <div className={classes.buttonWrapper} onClick={() => root.ui.setRoute(Routes.Users)}>
        <GroupIcon />
        <Typography variant="body2">
          <FormattedMessage id="users" />
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
