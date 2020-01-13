import React, { useRef } from 'react';
import { navigate } from '@reach/router';
import { useStore } from 'react-hookstore';
import { useTranslation } from 'react-i18next';

const samples = {
  terminated: '1183909147072520193',
  isProtected: '1215987140351479809',
  suspended: '1209194776656072704',
  deleted: '1214957370431942656',
  ok: '1214936962349576192',
  notAReplyError: '1183908355372273665',
  default: ''
};

const Controls = () => {
  const [{ fetchError }] = useStore('resurrect');
  const { t } = useTranslation('resurrect');
  const selectionRef = useRef();

  const runTest = async (submitEvent) => {
    submitEvent.preventDefault();
    const testPath = `/resurrect/${samples[selectionRef.current.value]}`;
    const replace = window.location.pathname === testPath;
    if (replace) {
      await navigate('/resurrect/', { replace });
    }
    navigate(testPath, { replace });
  };

  return (
    <div className="
      flex flex-col
      card
      justify-center
      w-full sm:w-full md:w-10/12 lg:w-8/12
      mt-10 mb-5
      ml-auto mr-auto
    ">
      <form className="flex justify-center w-full">
        <select ref={selectionRef} onChange={runTest}>
          <option value="terminated">Terminated Tweet</option>
          <option value="isProtected">Protected Account</option>
          <option value="suspended">Suspended Account</option>
          <option value="deleted">Deleted Tweet</option>
          <option value="ok">Tweet is ok</option>
          <option value="notAReplyError">NotAReplyError</option>
          <option value="default">Reset to default</option>
        </select>
        {/*<button className="uppercase self-center" type="submit">{t('buttons.check')}</button>*/}
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
