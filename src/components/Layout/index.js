import React, { useContext } from "react"
import { ThemeProvider } from "styled-components"
// Styles
import { GlobalStyles, darkTheme, lightTheme } from "styles/GlobalStyles"
//
import { ModeContext } from "context/ModeProvider"
import { useMetaDataQuery } from "hooks/useMetaDataQuery"
import Header from "components/Header"
import { MDXProvider } from "@mdx-js/react"
import H2 from "../MDX/H2"
const shortcodes = {
  H2,
}

const Layout = ({ children }) => {
  //
  const [darkMode] = useContext(ModeContext)
  const data = useMetaDataQuery()
  //
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Header siteTitle={data.title} />
      <MDXProvider components={shortcodes}>{children}</MDXProvider>
    </ThemeProvider>
  )
}

export default Layout
