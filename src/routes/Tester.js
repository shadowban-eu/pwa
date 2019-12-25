import React from 'react';
import { createStore, useStore } from 'react-hookstore';

import { initialState, reducer } from '../reducers/tester';
import { SET_SCREEN_NAME, VALIDATE_SCREEN_NAME } from '../actions';

import Title from './Tester/Title';
import DonationButton from './Tester/DonationButton';
import Controls from './Tester/Controls';
import Results from './Tester/Results';

createStore('tester', initialState, reducer);

const Tester = (props) => {
  const { screenName } = props;
  const [, dispatch] = useStore('tester');

  React.useEffect(() => {
    if (screenName) {
      dispatch({ type: SET_SCREEN_NAME, screenName });
      dispatch({ type: VALIDATE_SCREEN_NAME, screenName });
    }
  }, [screenName, dispatch]);


  return (
    <div className="flex flex-col bg-shadowblue">
      <div className="text-center">
        <Title />
        <DonationButton />
      </div>
      <Controls />
      <Results />
    </div>
  );
};

export default Tester;
