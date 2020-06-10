import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components';
// Styles
import { GlobalStyles, darkTheme, lightTheme } from 'styles/GlobalStyles';
//
import { ModeContext } from 'context/ModeProvider';
import { useMetaDataQuery } from 'hooks/useMetaDataQuery';
import Header from 'components/Header';
const Layout = ({ children }) => {
  //
  const [ darkMode ] = useContext(ModeContext);
  const data = useMetaDataQuery();
  //
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Header siteTitle={data.title} />
      {children}
    </ThemeProvider>
  );
};

export default Layout;
