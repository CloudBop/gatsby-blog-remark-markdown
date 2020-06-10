import React from 'react';
import { ThemeProvider } from 'styled-components';
// Styles
import { GlobalStyles, darkTheme } from 'styles/GlobalStyles';
//
import { useMetaDataQuery } from 'hooks/useMetaDataQuery';
const Layout = ({ children }) => {
  //
  const data = useMetaDataQuery();
  //
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      layout component
      {children}
    </ThemeProvider>
  );
};

export default Layout;
