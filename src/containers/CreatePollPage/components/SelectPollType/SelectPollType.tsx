import React, { FC, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import useStyles from './styles';
import { Grid, Typography } from '@mui/material';
import { Button } from '../../../../ui-kit';
import CheckIcon from '../../../../ui-kit/icons/CheckIcon';
import CheckDoubleIcon from '../../../../ui-kit/icons/CheckDoubleIcon';
import TalkIcon from '../../../../ui-kit/icons/TalkIcon';
import { PollTypeEnum } from '../../types';
import { COLOURS } from '../../../../theme/consts';

interface IProps {
  onSelectedType?: (type: PollTypeEnum) => void;
}

const SelectPollType: FC<IProps> = (props) => {
  const { onSelectedType } = props;
  const classes = useStyles();

  const pollButtonTypes = [
    {
      type: PollTypeEnum.OneAnswer,
      icon: <CheckIcon />,
      text: <FormattedMessage id="pollWithCorrectAnswer" />,
    },
    {
      type: PollTypeEnum.MultipleAnswer,
      icon: <CheckDoubleIcon />,
      text: <FormattedMessage id="multipleAnswerOptions" />,
    },
    {
      type: PollTypeEnum.OpenEndedAnswer,
      icon: <TalkIcon />,
      text: <FormattedMessage id="pollOpenEnded" />,
    },
  ];
  const [selectedPollType, setSelectedPollType] = useState<PollTypeEnum>(pollButtonTypes[0].type);

  const onSelectPollType = (type: PollTypeEnum) => {
    setSelectedPollType(type);
    onSelectedType?.(type);
  };

  return (
    <Grid item xs={12} mb={2.5}>
      <Typography variant="body2" mb={1}>
        <FormattedMessage id="selectPollType" />
      </Typography>
      <Grid container direction="column" rowSpacing={1.3}>
        {pollButtonTypes.map((button, idx) => {
          return (
            <Grid key={idx} item>
              <Button
                className={classes.button}
                style={{
                  borderColor: selectedPollType === button.type && COLOURS.BLUE_02,
                }}
                fullWidth
                variant="outlined"
                data-qa={`${idx}`}
                onClick={() => onSelectPollType(button.type)}
              >
                <Grid container spacing={1.5} columnSpacing={1.5}>
                  <Grid style={{ paddingTop: '10px' }} item>
                    {button.icon}
                  </Grid>
                  <Grid style={{ paddingTop: '10px' }} item>
                    {button.text}
                  </Grid>
                </Grid>
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default SelectPollType;
