import React from 'react';
import { navigate } from '@reach/router';
import { useStore } from 'react-hookstore';
import { useTranslation } from 'react-i18next';

import ScreenNameInput from './ScreenNameInput';

const Controls = () => {
  const [{ screenName }] = useStore('tester');
  const { t } = useTranslation('common');

  const runTest = async (submitEvent) => {
    submitEvent.preventDefault();
    navigate(`/${screenName}`);
  };

  return (
    <div className="
      card
      justify-center
      sm:w-full md:w-10/12 lg:w-8/12
      mt-10 mb-5
      ml-auto mr-auto
    ">
      <form className="flex justify-center" onSubmit={runTest}>
        <ScreenNameInput />
        <button className="uppercase self-center" type="submit">{t('buttons.check')}</button>
      </form>
    </div>
  );
};

export default Controls;
