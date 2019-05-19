import React from 'react';
import AppWithAuth from './AppWithAuth';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0085e6'
    },
    secondary: {
      main: '#0068b3'
    }
  },
  typography: {
    useNextVariants: true
  }
});

const AppWithTheme = () => {
  return (
    <MuiThemeProvider
      theme={theme}
    >
      <AppWithAuth />
    </MuiThemeProvider>
  );
}

export default AppWithTheme;
