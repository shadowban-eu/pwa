import React, { Suspense } from 'react';
import { createStore, useStore } from 'react-hookstore';
import useSWR from 'swr';

import { initialState, reducer } from '../reducers/tester';
import {
  SET_SCREEN_NAME,
  VALIDATE_SCREEN_NAME,
  RUN_TEST,
  SET_CURRENT_RESULTS,
  SET_FETCH_ERROR
} from '../actions/tester';

import Title from './Tester/Title';
import Controls from './Tester/Controls';
import Results from './Tester/Results';
import DonateModal from '../DonateModal';
import Loading from '../Loading';

createStore('tester', initialState, reducer);

const Tester = (props) => {
  const { screenName } = props;
  const [{ valid }, dispatch] = useStore('tester');
  useSWR(
    screenName && valid ? `${process.env.REACT_APP_TEST_URL}/${screenName}` : null,
    {
      fetcher: async (...args) => {
        dispatch({ type: RUN_TEST });
        let res;
        try {
          res = await fetch(...args);
          const result = await res.json();
          dispatch({ type: SET_CURRENT_RESULTS, result });
        } catch (err) {
          dispatch({
            type: SET_FETCH_ERROR,
            errorMessage: err.message === 'Failed to fetch'
              ? 'Backend is offline! Please try again later'
              : err.message
          });
        }
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
      <div className="flex flex-col h-full bg-shadowblue">
        <div className="text-center">
          <Title />
          <DonateModal />
        </div>
        <Controls />
        <Results />
      </div>
    </Suspense>
  );
};

export default Tester;
