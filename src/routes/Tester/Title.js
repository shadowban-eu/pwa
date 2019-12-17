import React from 'react';

import { TesterContext } from '../../contexts';

const Title = () => {
  const { screenName } = React.useContext(TesterContext);

  return (
    <h2 className="
      w-screen
      mt-10 mb-6
      font-lobster
      leading-title
      text-title
      text-twitterblue
    ">
      Is <span className="text-accent-purple">@{screenName || 'username'}</span><br />
      shadowbanned on Twitter?
    </h2>
  );
};

export default Title;
