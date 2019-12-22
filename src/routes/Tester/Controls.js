import React from 'react';
import { useStore } from 'react-hookstore';

import { RUN_TEST, SET_CURRENT_RESULTS } from '../../actions';
import ScreenNameInput from './ScreenNameInput';


const Controls = () => {
  const [{ screenName }, dispatch] = useStore('tester');

  const runTest = async (submitEvent) => {
    submitEvent.preventDefault();
    dispatch({ type: RUN_TEST });
    const res = await fetch(`${process.env.REACT_APP_TEST_URL}/${screenName}`);
    const result = await res.json();
    dispatch({ type: SET_CURRENT_RESULTS, result });
  };

  return (
    <div className="
      card
      justify-center
      sm:w-full md:w-10/12 lg:w-8/12
      mt-10 mb-5
      ml-auto mr-auto
    ">
      <form className="flex justify-center" onSubmit={runTest}>
        <ScreenNameInput />
        <button className="uppercase self-center" type="submit">Check</button>
      </form>
    </div>
  );
};

export default Controls;
