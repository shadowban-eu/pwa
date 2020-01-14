import React, { useRef } from 'react';
import { navigate } from '@reach/router';
import { useStore } from 'react-hookstore';
import { useTranslation } from 'react-i18next';

import { tweetUrlOrIdRX } from '../../utils';
import {
  SET_PROBE_ID,
  VALIDATE_PROBE_ID
} from '../../actions/resurrect';

// const samples = {
//   terminated: '1183909147072520193',
//   isProtected: '1215987140351479809',
//   suspended: '1209194776656072704',
//   deleted: '1214957370431942656',
//   ok: '1214936962349576192',
//   notAReplyError: '1183908355372273665',
//   default: ''
// };

const Controls = () => {
  const [{ fetchError, probeId, valid }, dispatch] = useStore('resurrect');
  const { t } = useTranslation(['resurrect', 'common']);
  const inputElement = useRef();

  const runTest = async (submitEvent) => {
    submitEvent.preventDefault();
    const testPath = `/resurrect/${probeId}`;
    const replace = window.location.pathname === testPath;
    if (replace) {
      await navigate('/resurrect/', { replace });
    }
    navigate(testPath, { replace });
  };

  const inputColorClasses = valid
    ? 'border-gray-400 text-accent-purple focus:border-twitterblue'
    : 'border-accent-error text-accent-error focus:border-accent-error';

  const labelClasses = probeId
    ? valid ? 'active text-twitterblue' : 'active text-accent-error'
    : 'text-twitterblue';

  const handleChange = () => {
    let probeId = inputElement.current.value;
    try {
      probeId = inputElement.current.value.match(tweetUrlOrIdRX)[2];
    } catch (err) {} // eslint-disable-line

    dispatch({ type: SET_PROBE_ID, probeId });
    dispatch({ type: VALIDATE_PROBE_ID, probeId });
  };

  React.useEffect(() => {
    inputElement.current.value = probeId;
  }, [inputElement, probeId]);

  return (
    <div className="
      flex flex-col
      card
      justify-center
      w-full sm:w-full md:w-10/12 lg:w-8/12
      mt-10 mb-5
      ml-auto mr-auto
    ">
      <form className="flex justify-center w-full" onSubmit={runTest}>
        <div className="label-input relative sm:w-64 w-2/3 my-4 mr-0 sm:mr-4">
          <input
            id="probeId"
            type="text"
            ref={inputElement}
            pattern={tweetUrlOrIdRX.source}
            autoComplete="url"
            onChange={handleChange}
            className={`h-12 ml-12 border-b-2 font-medium focus:outline-none ${inputColorClasses}`}
          />
          <label htmlFor="probeId" className={labelClasses}>{t('probeIdDefault')}</label>
        </div>
        <button className="uppercase self-center" type="submit">{t('common:buttons.resurrect')}</button>
      </form>
      {
        fetchError
          ? <div className="text-accent-error text-center my-4">{t(`errors.${fetchError.code}`)}</div>
          : null
      }
    </div>
  );
};

export default Controls;
