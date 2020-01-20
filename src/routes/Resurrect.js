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
import FAQ from './Resurrect/FAQ';

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
          if (!res.ok) {
            throw result;
          }
          dispatch({ type: SET_RESULT, result });
        } catch (err) {
          console.log('fetch error dispatch')
          dispatch({
            type: SET_FETCH_ERROR,
            error: err.errors[0]
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
      <div className="flex flex-col h-full bg-shadowblue">
        <Title />
        <Controls />
        <FAQ />
      </div>
    </Suspense>
  );
}

export default Resurrect;
