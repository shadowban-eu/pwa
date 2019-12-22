import React from 'react';
import { useStore } from 'react-hookstore';

import { RUN_TEST, SET_CURRENT_RESULTS } from '../../actions';
import ScreenNameInput from './ScreenNameInput';


const Controls = () => {
  const [{ screenName }, dispatch] = useStore('tester');

  const runTest = async () => {
    dispatch({ type: RUN_TEST });
    const res = await fetch(`http://localhost:4000/.api/${screenName}`);
    const result = await res.json();
    console.log(result);
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
      <ScreenNameInput />
      <button className="uppercase self-center" onClick={runTest}>Check</button>
    </div>
  );
};

export default Controls;
