import React, { Suspense } from 'react';
import { createStore, useStore } from 'react-hookstore';
import useSWR from 'swr';

import { initialState, reducer } from '../reducers/tester';
import {
  SET_SCREEN_NAME,
  VALIDATE_SCREEN_NAME,
  RUN_TEST,
  SET_CURRENT_RESULTS,
  RESET_CURRENT_RESULTS,
  SET_FETCH_ERROR
} from '../actions/tester';

import { INCREMENT_TESTED } from '../actions/donateModal';

import Title from './Tester/Title';
import Controls from './Tester/Controls';
import Results from './Tester/Results';
import FAQ from './Tester/FAQ'
import DonateModal from '../DonateModal';
import Loading from '../Loading';

createStore('tester', initialState, reducer);

const fetchTestResults = async (testerDispatch, modalDispatch, ...args) => {
  testerDispatch({ type: RESET_CURRENT_RESULTS })
  testerDispatch({ type: RUN_TEST });
  let res;
  try {
    res = await fetch(...args);
    const result = await res.json();
    testerDispatch({ type: SET_CURRENT_RESULTS, result });
    modalDispatch({ type: INCREMENT_TESTED });
  } catch (err) {
    testerDispatch({
      type: SET_FETCH_ERROR,
      fetchError: { code: 'EFETCHFAILED' }
    });
  }
};

const Tester = (props) => {
  const { screenName } = props;
  const [{ valid }, testerDispatch] = useStore('tester');
  const [, modalDispatch] = useStore('donateModal');
  const fetcher = fetchTestResults.bind(null, testerDispatch, modalDispatch);

  const sanitizedScreenName = screenName ? screenName.replace('@', '') : '';

  useSWR(
    sanitizedScreenName && valid ? `${process.env.REACT_APP_TEST_URL}/${sanitizedScreenName}` : null,
    {
      fetcher,
      revalidateOnFocus: false,
      shouldRetryOnError: false
    }
  );

  React.useEffect(() => {
    if (sanitizedScreenName) {
      document.title = `Twitter Shadowban Test ~ ${sanitizedScreenName}`;
      testerDispatch({ type: SET_SCREEN_NAME, screenName: sanitizedScreenName });
      testerDispatch({ type: VALIDATE_SCREEN_NAME, screenName: sanitizedScreenName });
    } else {
      document.title = 'Twitter Shadowban Test';
      testerDispatch({ type: SET_SCREEN_NAME, screenName: '' });
      testerDispatch({ type: RESET_CURRENT_RESULTS });
    }
  }, [sanitizedScreenName, testerDispatch]);

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col h-full bg-shadowblue">
        <div className="text-center">
          <Title />
          <DonateModal />
        </div>
        <Controls fetcher={fetcher} />
        <Results />
        <FAQ />
      </div>
    </Suspense>
  );
};

export default Tester;
