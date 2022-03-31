import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ICreatePollForm, PollTypeEnum } from 'containers/CreatePollPage/types';
import { FormApi } from 'final-form';
import React, { FC, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { COLOURS } from 'theme/consts';
import PollOption1 from 'ui-kit/icons/PollOption1';
import PollOption2 from 'ui-kit/icons/PollOption2';
import PollOption3 from 'ui-kit/icons/PollOption3';

interface IPropsCard {
  title: string;
  onClick: () => void;
  active: boolean;
  icon: React.ReactNode;
}

const PollTypeCard: React.FC<IPropsCard> = (props) => {
  const { title, onClick: onClickFromProps, active, icon } = props;
  const ref = useRef<HTMLDivElement>(null);

  const clickHandler = () => {
    ref.current?.scrollIntoView({ block: 'end', inline: 'start' });
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
      data-qa={title}
      sx={{
        '& > svg': { opacity },
        '& > svg:hover': {
          opacity: 1,
        },
      }}
    >
      {icon}
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
      <Grid container wrap="nowrap" columnGap={3} mb={5} overflow="auto" paddingRight="24px">
        <PollTypeCard
          title="poll"
          onClick={clickHandler('withAnswer', false)}
          active={selectedPollType === PollTypeEnum.MultipleAnswer}
          icon={<PollOption1 fill={selectedPollType === PollTypeEnum.MultipleAnswer ? COLOURS.BLUE_02 : ''} />}
        />
        <PollTypeCard
          title="test"
          onClick={clickHandler('withAnswer', true)}
          active={selectedPollType === PollTypeEnum.OneAnswer}
          icon={<PollOption2 fill={selectedPollType === PollTypeEnum.OneAnswer ? COLOURS.BLUE_02 : ''} />}
        />
        <PollTypeCard
          title="pollOpenEnded"
          onClick={clickHandler('isOpenEnded', true)}
          active={selectedPollType === PollTypeEnum.OpenEndedAnswer}
          icon={<PollOption3 fill={selectedPollType === PollTypeEnum.OpenEndedAnswer ? COLOURS.BLUE_02 : ''} />}
        />
      </Grid>
    </>
  );
};

export default SelectPollType;
