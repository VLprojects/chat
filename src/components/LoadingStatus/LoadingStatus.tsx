import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import useStyles from './styles';

interface ILoadingStatus {
  intlId: string;
}

const LoadingStatus: FC<ILoadingStatus> = (props) => {
  const { intlId } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormattedMessage id={intlId} />
    </div>
  );
};

export default LoadingStatus;
