import React, { Suspense } from 'react';
import useSWR from 'swr';
import { createStore, useStore } from 'react-hookstore';

import { initialState, reducer } from '../reducers/resurrect';
import {
  SET_PROBE_ID,
  RUN_TEST,
  SET_RESULT,
  SET_FETCH_ERROR
} from '../actions/resurrect';

import Loading from '../Loading';
import Title from './Resurrect/Title';
import Controls from './Resurrect/Controls';

createStore('resurrect', initialState, reducer);

const Resurrect = ({ probeId }) => {
  const [,dispatch] = useStore('resurrect');
  useSWR(
    probeId ? `${process.env.REACT_APP_RESURRECT_URL}/${probeId}` : null,
    {
      fetcher: async (...args) => {
        dispatch({ type: RUN_TEST });
        let res;
        try {
          res = await fetch(...args);
          const result = await res.json();
          dispatch({ type: SET_RESULT, result });
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
    if (probeId) {
      dispatch({ type: SET_PROBE_ID, probeId });
    }
  }, [probeId, dispatch]);

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col bg-shadowblue">
        <div className="text-center">
          <Title />
          <Controls />
        </div>
      </div>
    </Suspense>
  );
}

export default Resurrect;
