import MoreHoriz from '@mui/icons-material/MoreHoriz';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import { alpha } from '@mui/system/colorManipulator';
import PollStatusBadge from 'components/PollStatusBadge';
import useKeystone from 'keystone';
import Poll from 'keystone/chat/poll';
import { observer } from 'mobx-react';
import React, { FC, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { COLOURS } from 'theme/consts';
import { IPollStatus } from 'types/types';
import { getPollType } from 'utils/helper';

import PollAction from '../PollAction';
import useStyles from './styles';

interface IProps {
  templatePoll: Poll;
  onDelete: (poll: Poll) => void;
}

const PollCard: FC<IProps> = (props) => {
  const { templatePoll, onDelete: onDeleteFromProps } = props;
  const root = useKeystone();

  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);
  const handleMenuActionClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleMenuActionClose = () => setAnchorMenu(null);

  const onDelete = () => {
    onDeleteFromProps(templatePoll);
    handleMenuActionClose();
  };

  const classes = useStyles();

  const currentChannel = root.currentChannel;
  const lastActivePoll = currentChannel?.getLastPollByTemplateId(templatePoll?.id);

  return (
    <Box>
      <Card classes={{ root: classes.root }}>
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={handleMenuActionClick}>
              <MoreHoriz />
            </IconButton>
          }
          title={<PollStatusBadge status={lastActivePoll?.status || templatePoll.status} />}
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
          <MenuItem
            onClick={onDelete}
            disabled={lastActivePoll?.status === IPollStatus.InProgress}
            sx={{ boxShadow: '0px 4px 20px rgba(9, 43, 98, 0.07)', borderRadius: '10px', background: COLOURS.WHITE }}
          >
            <Typography variant="subtitle2" color="text.error">
              <FormattedMessage id="delete" />
            </Typography>
          </MenuItem>
        </Menu>
        <CardContent>
          <Typography variant="h4" sx={{ wordBreak: 'break-word' }}>
            {templatePoll.question}
          </Typography>
          <Typography variant="body2" color={alpha(COLOURS.BLACK_02, 0.6)} marginTop="9px" marginBottom="23px">
            <FormattedMessage id={getPollType(templatePoll)} />
          </Typography>
        </CardContent>
      </Card>
      <PollAction templatePoll={templatePoll} lastActivePoll={lastActivePoll} />
    </Box>
  );
};

export default observer(PollCard);
