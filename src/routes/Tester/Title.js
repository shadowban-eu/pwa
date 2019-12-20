import React from 'react';
import { useStore } from 'react-hookstore';

const Title = () => {
  const [{ screenName, valid }] = useStore('tester');

  return (
    <h2 className="
      mt-10 mb-6
      font-lobster
      leading-title
      text-title
      text-twitterblue
    ">
      Is <span className="text-accent-purple">@{(valid &&screenName) || 'username'}</span><br />
      shadowbanned on Twitter?
    </h2>
  );
};

export default Title;
