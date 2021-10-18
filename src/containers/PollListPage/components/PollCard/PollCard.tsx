import { Card, CardContent, CardHeader, IconButton, Menu, MenuItem } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React, { FC, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Poll from '../../../../keystone/chat/poll';
import { IPollStatus } from '../../../../types/types';
import PollAction from '../PollAction';
import useStyles from './styles';

interface IProps {
  poll: Poll;
  onDelete: (poll: Poll) => void;
}

const PollCard: FC<IProps> = (props) => {
  const { poll, onDelete: onDeleteFromProps } = props;
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);
  const handleMenuActionClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleMenuActionClose = () => setAnchorMenu(null);

  const onDelete = () => {
    onDeleteFromProps(poll);
    handleMenuActionClose();
  };

  const classes = useStyles();

  return (
    <Card classes={{ root: classes.root }}>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={handleMenuActionClick}>
            <MoreHorizIcon color="primary" className={classes.moreAction} />
          </IconButton>
        }
        title={poll.question}
      />
      <Menu id="poll-menu" anchorEl={anchorMenu} open={Boolean(anchorMenu)} onClose={handleMenuActionClose}>
        <MenuItem onClick={onDelete} disabled={poll.status === IPollStatus.InProgress}>
          <DeleteForeverIcon /> <FormattedMessage id="deletePoll" />
        </MenuItem>
      </Menu>
      <CardContent>
        <PollAction poll={poll} />
      </CardContent>
    </Card>
  );
};

export default PollCard;
