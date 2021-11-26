import SettingsIcon from '@mui/icons-material/Settings';
import { Grid, IconButton, TextareaAutosize } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';
import React, { ChangeEvent, FC, KeyboardEvent, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { COLOURS } from 'theme/consts';
import SubmitMessageIcon from 'ui-kit/icons/SubmitMessageIcon';
import useKeystone from '../../keystone';
import { sendMessage } from '../../keystone/service';
import { getErrorMessage } from '../../utils/errors';
import MessageInputActions from './components/MessageInputActions';
import useStyles from './styles';

interface IMessageInput {
  channelId: string;
  isModerator: boolean;
}

const MessageInput: FC<IMessageInput> = (props) => {
  const intl = useIntl();
  const { channelId, isModerator } = props;
  const classes = useStyles();

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const root = useKeystone();
  const { enqueueSnackbar } = useSnackbar();
  const inputRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  const onInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const onMessageSubmit = async () => {
    if (message.length) {
      try {
        setLoading(true);
        await sendMessage(root, channelId, message);
        setMessage('');
      } catch (error) {
        enqueueSnackbar(getErrorMessage(error as Error));
      } finally {
        setLoading(false);
        inputRef?.current?.focus();
      }
    }
  };
  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      onMessageSubmit();
    }
  };
  return (
    <div className={classes.root}>
      <Grid container alignItems="center" spacing={1.5} wrap="nowrap">
        {isModerator && (
          <Grid item alignSelf="baseline" sx={{ color: '#999999', cursor: 'pointer' }}>
            <MessageInputActions icon={<SettingsIcon fontSize="small" color="inherit" />} />
          </Grid>
        )}
        <Grid item xs={10} sx={{ overflow: 'auto', paddingLeft: '9px' }}>
          <TextareaAutosize
            onKeyDown={onKeyDown}
            placeholder={intl.formatMessage({ id: 'messageInputPlaceholder' })}
            value={message}
            maxRows={5}
            onChange={onInputChange}
            disabled={loading}
            data-qa="input-message"
            ref={inputRef}
          />
        </Grid>
        <Grid item alignSelf="baseline" sx={{ overflow: 'hidden' }}>
          <IconButton
            sx={{ '&:hover': { backgroundColor: 'transparent' }, height: 32 }}
            data-qa="send-button"
            onClick={onMessageSubmit}
            disabled={loading}
            disableFocusRipple
            disableRipple
          >
            <SubmitMessageIcon fill={!loading && message.length ? COLOURS.BLACK : COLOURS.LIGHT_01} />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default observer(MessageInput);
