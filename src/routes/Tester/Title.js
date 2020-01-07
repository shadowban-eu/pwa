import React from 'react';
import { useStore } from 'react-hookstore';
import { useTranslation } from 'react-i18next';

const Title = () => {
  const [{ screenName, valid }] = useStore('tester');
  const { t } = useTranslation('common');

  return (
    <h2 className="
      w-full
      mt-10 mb-6
      font-lobster
      leading-title
      text-smtitle sm:text-smtitle md:text-title
      text-twitterblue
    ">
      Is <span className="text-accent-purple">@{(valid && screenName) || t('screenNameDefault')}</span><br />
      shadowbanned on Twitter?
    </h2>
  );
};

export default Title;
