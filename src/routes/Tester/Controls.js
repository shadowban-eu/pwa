import React from 'react';
import { navigate } from '@reach/router';
import { useStore } from 'react-hookstore';
import { useTranslation } from 'react-i18next';

import ScreenNameInput from './ScreenNameInput';

const Controls = ({ fetcher }) => {
  const [{ screenName }] = useStore('tester');
  const { t } = useTranslation('common');

  const runTest = async (submitEvent) => {
    submitEvent.preventDefault();
    const testPath = `/${screenName}`;
    if (window.location.pathname === testPath) {
      fetcher(`${process.env.REACT_APP_TEST_URL}/${screenName}`);
    } else {
      navigate(testPath);
    }
  };

  return (
    <div className="
      card
      justify-center
      w-full sm:w-full md:w-10/12 lg:w-8/12
      mt-10 mb-5
      ml-auto mr-auto
    ">
      <form className="flex justify-center w-full" onSubmit={runTest}>
        <ScreenNameInput />
        <button className="uppercase self-center" type="submit">{t('buttons.check')}</button>
      </form>
    </div>
  );
};

export default Controls;
