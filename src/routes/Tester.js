import React, { Suspense } from 'react';
import { createStore, useStore } from 'react-hookstore';
import useSWR from 'swr';

import { initialState, reducer } from '../reducers/tester';
import {
  SET_SCREEN_NAME,
  VALIDATE_SCREEN_NAME,
  RUN_TEST,
  SET_CURRENT_RESULTS
} from '../actions/tester';

import Title from './Tester/Title';
import DonationButton from './Tester/DonationButton';
import Controls from './Tester/Controls';
import Results from './Tester/Results';
import Loading from '../Loading';

createStore('tester', initialState, reducer);

// const fetchAndDispatchResults = async (...args) => {
//   const res = await fetch(...args);
//   const results
// };

const Tester = (props) => {
  const { screenName } = props;
  const [{ valid }, dispatch] = useStore('tester');
  useSWR(
    screenName && valid ? `${process.env.REACT_APP_TEST_URL}/${screenName}` : null,
    {
      fetcher: async (...args) => {
        dispatch({ type: RUN_TEST });
        const res = await fetch(...args);
        const result = await res.json();
        dispatch({ type: SET_CURRENT_RESULTS, result });
      },
      revalidateOnFocus: false,
      shouldRetryOnError: false
    }
  );

  React.useEffect(() => {
    if (screenName) {
      dispatch({ type: SET_SCREEN_NAME, screenName });
      dispatch({ type: VALIDATE_SCREEN_NAME, screenName });
    }
  }, [screenName, dispatch]);

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col bg-shadowblue">
        <div className="text-center">
          <Title />
          <DonationButton />
        </div>
        <Controls />
        <Results />
      </div>
    </Suspense>
  );
};

export default Tester;
