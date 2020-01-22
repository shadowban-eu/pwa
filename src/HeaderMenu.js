import React from 'react';
import { Link } from '@reach/router';

import SafeLink from './SafeLink';

const HeaderMenuLink = (props) => {
  const { className } = props;
  const defaultClassName = `${className ? className : ''} pl-2 text-black`;
  const activeClassName = `${defaultClassName} underline`;

  return (
    <Link
      {...props}
      getProps={(locationMatch) => {
        let isCurrent;
        const actualHref = locationMatch.location.pathname;

        if (locationMatch.href === '/resurrect') {
          isCurrent = actualHref.startsWith('/resurrect') && locationMatch.isPartiallyCurrent;
        } else {
          isCurrent = !actualHref.startsWith('/resurrect') && locationMatch.isPartiallyCurrent;
        }

        return ({
          className: isCurrent ? activeClassName : defaultClassName
        });
      }
    }
    />
  );
};

const HeaderMenu = () => {
  return (
    <div className="
      flex justify-between
      w-full h-20
      pt-4 px-4
      shadow-inner
      bg-shadowblue
    ">
      <h2 className="font-lobster text-xl">
        <HeaderMenuLink
          to="/"
          className="text-twitterblue no-underline"
        >
          shadowban<span className="text-accent-purple">.eu</span>
        </HeaderMenuLink>
      </h2>
      <div>
        <ul>
          <HeaderMenuLink to={`${process.env.PUBLIC_URL}/`}>Tester</HeaderMenuLink>
          <HeaderMenuLink to={`${process.env.PUBLIC_URL}/resurrect`}>Resurrect</HeaderMenuLink>
          <SafeLink
            href="https://blog.shadowban.eu/"
            icon
            iconClassName="inline w-2 h-2 ml-1 align-top stroke-current"
            className="pl-2 text-black"
          >Blog</SafeLink>
        </ul>
      </div>
    </div>
  );
};

export default HeaderMenu;
