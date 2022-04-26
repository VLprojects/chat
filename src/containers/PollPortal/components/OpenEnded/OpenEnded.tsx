import { Input, Typography } from '@mui/material';
import React, { ChangeEvent, FC, useState } from 'react';
import { useIntl } from 'react-intl';
import SubmitPollButton from '../SubmitPollButton';
import useStyles from './styles';

interface IProps {
  voteHandler: (payload: string[]) => void;
}

const MIN_INPUT_LENGTH = 1;
const MAX_INPUT_LENGTH = 200;

const OpenEnded: FC<IProps> = (props) => {
  const { voteHandler } = props;
  const classes = useStyles();
  const intl = useIntl();
  const [value, setValue] = useState('');
  const [isValidInput, setIsValidInput] = useState<boolean>(false);
  const [validationErrorText, setValidationErrorText] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = (event.target as HTMLInputElement).value;

    if (val.trim().length < MIN_INPUT_LENGTH) {
      setValidationErrorText(
        intl.formatMessage({ id: 'pollValidateAnswerLongerLetters' }, { length: MIN_INPUT_LENGTH }),
      );
      setIsValidInput(false);
    } else if (val.trim().length > MAX_INPUT_LENGTH) {
      setValidationErrorText(
        intl.formatMessage({ id: 'pollValidateAnswerNotLongerLetters' }, { length: MAX_INPUT_LENGTH }),
      );
      setIsValidInput(false);
    } else {
      setValidationErrorText('');
      setIsValidInput(true);
    }

    setValue(val);
  };

  return (
    <>
      <Input
        type="text"
        className={classes.input}
        fullWidth
        disableUnderline
        rows={3}
        onChange={handleChange}
        multiline
        data-qa="poll-pick-textarea"
        placeholder={intl.formatMessage({ id: 'your.reply' })}
      />

      {validationErrorText && (
        <Typography textAlign="center" py={1.5}>
          {validationErrorText}
        </Typography>
      )}

      <SubmitPollButton disabled={!isValidInput} onSubmit={() => voteHandler([value])} dataQA="deployReply" />
    </>
  );
};

export default OpenEnded;
