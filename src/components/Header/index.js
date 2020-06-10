import React, { useState } from 'react';
import { Link } from 'gatsby';
import Menu from 'components/Menu';
import Hamburger from 'components/Hamburger';

// Hooks
import { useSiteConfigQuery } from 'hooks/useSiteConfigQuery';
// Context
// Styles
import { Wrapper, Logo } from './Header.styles';

const Header = ({ siteTitle = `` }) => {
  const siteConfig = useSiteConfigQuery();
  const [ menuOpen, setMenuOpen ] = useState(false);
  return (
    <Wrapper>
      <Hamburger menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu items={siteConfig.menu} />
      <Link to="/">
        <Logo src={siteConfig.logo.publicURL} alt={siteTitle} />
      </Link>
      <div>mode</div>
    </Wrapper>
  );
};

export default Header;
