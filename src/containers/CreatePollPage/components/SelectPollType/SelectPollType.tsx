import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import { ICreatePollForm, PollTypeEnum } from 'containers/CreatePollPage/types';
import { FormApi } from 'final-form';
import React, { FC, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { COLOURS } from 'theme/consts';
import PollOption1 from 'ui-kit/icons/PollOption1';

interface IPropsCard {
  title: string;
  onClick: () => void;
  active: boolean;
}

const PollTypeCard: React.FC<IPropsCard> = (props) => {
  const { title, onClick: onClickFromProps, active } = props;
  const ref = useRef<HTMLDivElement>(null);

  const clickHandler = () => {
    ref.current?.scrollIntoView();
    onClickFromProps();
  };
  const opacity = active ? '1' : '0.5';

  return (
    <Grid
      item
      xs
      minWidth="139px"
      onClick={clickHandler}
      ref={ref}
      sx={{
        '& > svg': { opacity },
        '& > svg:hover': {
          opacity: 1,
        },
      }}
    >
      <PollOption1 fill={active ? COLOURS.BLUE_02 : ''} />
      <Typography mb={1} color={active ? 'text.primary' : 'text.secondary6'}>
        <FormattedMessage id={title} />
      </Typography>
    </Grid>
  );
};

interface IProps {
  form: FormApi<ICreatePollForm>;
  selectedPollType: PollTypeEnum;
}

const SelectPollType: FC<IProps> = (props) => {
  const { form, selectedPollType } = props;

  const clickHandler = (name: 'withAnswer' | 'isOpenEnded', value: boolean) => () => {
    form.batch(() => {
      form.reset();
      form.change(name, value);
    });
  };

  return (
    <>
      <Typography mb={3} mt={6}>
        <FormattedMessage id="selectPollType" />
      </Typography>
      <Box>
        <Grid container wrap="nowrap" columnGap={3} mb={5} overflow="auto" paddingRight="24px">
          <PollTypeCard
            title="poll"
            onClick={clickHandler('withAnswer', false)}
            active={selectedPollType === PollTypeEnum.MultipleAnswer}
          />
          <PollTypeCard
            title="test"
            onClick={clickHandler('withAnswer', true)}
            active={selectedPollType === PollTypeEnum.OneAnswer}
          />
          <PollTypeCard
            title="pollOpenEnded"
            onClick={clickHandler('isOpenEnded', true)}
            active={selectedPollType === PollTypeEnum.OpenEndedAnswer}
          />
        </Grid>
      </Box>
    </>
  );
};

export default SelectPollType;
