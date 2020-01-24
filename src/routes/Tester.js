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

import Title from './Tester/Title';
import Controls from './Tester/Controls';
import Results from './Tester/Results';
// import Functionality from './Tester/Functionality'
import DonateModal from '../DonateModal';
import Loading from '../Loading';

createStore('tester', initialState, reducer);

const fetchTestResults = async (dispatch, ...args) => {
  dispatch({ type: RESET_CURRENT_RESULTS })
  dispatch({ type: RUN_TEST });
  let res;
  try {
    res = await fetch(...args);
    const result = await res.json();
    dispatch({ type: SET_CURRENT_RESULTS, result });
  } catch (err) {
    dispatch({
      type: SET_FETCH_ERROR,
      fetchError: { code: 'EFETCHFAILED' }
    });
  }
};

const Tester = (props) => {
  const { screenName } = props;
  const [{ valid }, dispatch] = useStore('tester');
  const fetcher = fetchTestResults.bind(null, dispatch);

  useSWR(
    screenName && valid ? `${process.env.REACT_APP_TEST_URL}/${screenName}` : null,
    {
      fetcher,
      revalidateOnFocus: false,
      shouldRetryOnError: false
    }
  );

  React.useEffect(() => {
    if (screenName) {
      document.title = `Twitter Shadowban Test ~ ${screenName}`;
      dispatch({ type: SET_SCREEN_NAME, screenName });
      dispatch({ type: VALIDATE_SCREEN_NAME, screenName });
    } else {
      document.title = 'Twitter Shadowban Test';
      dispatch({ type: SET_SCREEN_NAME, screenName: '' });
      dispatch({ type: RESET_CURRENT_RESULTS });
    }
  }, [screenName, dispatch]);

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col h-full bg-shadowblue">
        <div className="text-center">
          <Title />
          <DonateModal />
        </div>
        <Controls fetcher={fetcher} />
        <Results />
        {/*<Functionality />*/}
      </div>
    </Suspense>
  );
};

export default Tester;
