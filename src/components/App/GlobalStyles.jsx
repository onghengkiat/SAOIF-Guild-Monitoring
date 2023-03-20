import { GlobalStyles as MuiGlobalStyles } from '@mui/material';
import React from 'react';

const GlobalStyles = () => {
  return (
    <MuiGlobalStyles styles={{
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      html: {
        height: '100%',
        width: '100%'
      },
      body: {
        height: '100%',
        width: '100%'
      },
      '#root': {
        height: '100%',
        width: '100%'
      }
    }} />
  );
};

export default GlobalStyles;