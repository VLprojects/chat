import Grid from '@mui/material/Grid';
import React from 'react';

const IOptionRowWrapper: React.FC = (props) => {
  return (
    <Grid container padding="16px 12px" alignItems="center">
      {props.children}
    </Grid>
  );
};

export default IOptionRowWrapper;
