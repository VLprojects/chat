import Grid from '@mui/material/Grid';
import React from 'react';

const IOptionRowWrapper: React.FC = (props) => {
  return (
    <Grid container alignItems="center">
      {props.children}
    </Grid>
  );
};

export default IOptionRowWrapper;
