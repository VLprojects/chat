import { DeleteOutlined, MoreHoriz } from '@mui/icons-material';
import { Card, CardContent, CardHeader, IconButton, Menu, MenuItem } from '@mui/material';
import React, { FC, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Poll from '../../../../keystone/chat/poll';
import { IPollStatus } from '../../../../types/types';
import PollAction from '../PollAction';
import useStyles from './styles';
import { getFormatMessagePollType } from '../../../CreatePollPage/services';

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
            <MoreHoriz />
          </IconButton>
        }
        sx={{ wordBreak: 'break-all' }}
        title={poll.question}
        subheader={getFormatMessagePollType(poll)}
        subheaderTypographyProps={{
          variant: 'body2',
        }}
      />
      <Menu
        id="poll-menu"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={handleMenuActionClose}
      >
        <MenuItem onClick={onDelete} sx={{ fontSize: 14 }} disabled={poll.status === IPollStatus.InProgress}>
          <DeleteOutlined sx={{ pr: '7px' }} /> <FormattedMessage id="delete" />
        </MenuItem>
      </Menu>
      <CardContent>
        <PollAction poll={poll} />
      </CardContent>
    </Card>
  );
};

export default PollCard;
