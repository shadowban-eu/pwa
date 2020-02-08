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

import { INCREMENT_TESTED } from '../actions/donateModal';

import Loading from '../Loading';
import DonateModal from '../DonateModal';
import Title from './Resurrect/Title';
import Controls from './Resurrect/Controls';
import FAQ from './Resurrect/FAQ';

createStore('resurrect', initialState, reducer);

const fetchResurrectResult = async (resurrectDispatch, modalDispatch, ...args) => {
  resurrectDispatch({ type: RESET_RESULT });
  resurrectDispatch({ type: RUN_TEST });
  let res;
  try {
    res = await fetch(...args);
    const result = await res.json();
    if (!res.ok) {
      console.log('Throwing not ok response')
      throw result;
    }
    resurrectDispatch({ type: SET_RESULT, result });
    modalDispatch({ type: INCREMENT_TESTED });
  } catch (err) {
    if (!err.errors) {
      return resurrectDispatch({
        type: SET_FETCH_ERROR,
        fetchError: { code: 'EFETCHFAILED' }
      });
    }
    resurrectDispatch({
      type: SET_FETCH_ERROR,
      fetchError: err.errors[0]
    });
  }
};

const Resurrect = ({ probeId }) => {
  const [, resurrectDispatch] = useStore('resurrect');
  const [, modalDispatch] = useStore('donateModal');
  const fetcher = fetchResurrectResult.bind(null, resurrectDispatch, modalDispatch);

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
      resurrectDispatch({ type: SET_PROBE_ID, probeId });
    } else {
      document.title = 'Twitter Shadowban Resurrect';
      resurrectDispatch({ type: SET_PROBE_ID, probeId: '' });
      resurrectDispatch({ type: RESET_RESULT });
    }
  }, [probeId, resurrectDispatch]);

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
