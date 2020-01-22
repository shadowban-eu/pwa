import React, { Suspense } from 'react';
import useSWR from 'swr';
import { createStore, useStore } from 'react-hookstore';

import { initialState, reducer } from '../reducers/resurrect';
import {
  SET_PROBE_ID,
  RUN_TEST,
  SET_RESULT,
  RESET_RESULT,
  SET_FETCH_ERROR
} from '../actions/resurrect';

import Loading from '../Loading';
import DonateModal from '../DonateModal';
import Title from './Resurrect/Title';
import Controls from './Resurrect/Controls';
import FAQ from './Resurrect/FAQ';

createStore('resurrect', initialState, reducer);

const fetchResurrectResult = async (dispatch, ...args) => {
  dispatch({ type: RESET_RESULT });
  dispatch({ type: RUN_TEST });
  let res;
  try {
    res = await fetch(...args);
    const result = await res.json();
    if (!res.ok) {
      console.log('Throwing not ok response')
      throw result;
    }
    dispatch({ type: SET_RESULT, result });
  } catch (err) {
    if (!err.errors) {
      return dispatch({
        type: SET_FETCH_ERROR,
        fetchError: { code: 'EFETCHFAILED' }
      });
    }
    dispatch({
      type: SET_FETCH_ERROR,
      fetchError: err.errors[0]
    });
  }
};

const Resurrect = ({ probeId }) => {
  const [,dispatch] = useStore('resurrect');
  const fetcher = fetchResurrectResult.bind(null, dispatch);

  useSWR(
    probeId ? `${process.env.REACT_APP_RESURRECT_URL}/${probeId}` : null,
    {
      fetcher,
      revalidateOnFocus: false,
      shouldRetryOnError: false
    }
  );

  React.useEffect(() => {
    if (probeId) {
      document.title = `Twitter Shadowban Resurrect ~ ${probeId}`;
      dispatch({ type: SET_PROBE_ID, probeId });
    } else {
      document.title = 'Twitter Shadowban Resurrect';
      dispatch({ type: SET_PROBE_ID, probeId: '' });
      dispatch({ type: RESET_RESULT });
    }
  }, [probeId, dispatch]);

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col h-full bg-shadowblue">
        <div className="text-center">
          <Title />
          <DonateModal />
        </div>
        <Controls fetcher={fetcher} />
        <FAQ />
      </div>
    </Suspense>
  );
}

export default Resurrect;
