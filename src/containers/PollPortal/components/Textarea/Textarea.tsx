import React, { ChangeEvent, FC, useState } from 'react';
import { FormControl, FormControlLabel, Input, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Button } from 'ui-kit';
import useStyles from './styles';
import intl from 'utils/intl';

interface IProps {
  voteHandler: (payload: string[]) => void;
}

const MIN_INPUT_LENGTH = 1;
const MAX_INPUT_LENGTH = 200;

const Textarea: FC<IProps> = (props) => {
  const { voteHandler } = props;
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [isValidInput, setIsValidInput] = useState<boolean>(false);
  const [validationErrorText, setValidationErrorText] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = (event.target as HTMLInputElement).value;

    if (val.length < MIN_INPUT_LENGTH) {
      setValidationErrorText(
        intl.formatMessage({ id: 'pollValidateAnswerLongerLetters' }, { length: MIN_INPUT_LENGTH }),
      );
      setIsValidInput(false);
    } else if (val.length > MAX_INPUT_LENGTH) {
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
      <FormControl style={{ flexGrow: 1 }}>
        <FormControlLabel
          sx={{
            margin: 0,
          }}
          data-qa="poll-pick-textarea"
          control={
            <Input
              type="text"
              className={classes.input}
              fullWidth
              disableUnderline
              rows={3}
              onChange={handleChange}
              multiline
            />
          }
          label=""
        />
      </FormControl>

      {validationErrorText && (
        <Typography textAlign="center" py={1.5}>
          {validationErrorText}
        </Typography>
      )}

      <Button
        data-qa="deployReply"
        variant="submit"
        fullWidth
        disabled={!isValidInput}
        onClick={() => voteHandler([value])}
      >
        <FormattedMessage id="reply" />
      </Button>
    </>
  );
};

export default Textarea;
