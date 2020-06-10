import React from 'react';
import { ThemeProvider } from 'styled-components';
// Styles
import { GlobalStyles, darkTheme } from 'styles/GlobalStyles';
//
import { useMetaDataQuery } from 'hooks/useMetaDataQuery';
import Header from 'components/Header';
const Layout = ({ children }) => {
  //
  const data = useMetaDataQuery();
  //
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <Header siteTitle={data.title} />
      {children}
    </ThemeProvider>
  );
};

export default Layout;
