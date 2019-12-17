import React from 'react';

import { TesterContext } from '../contexts';
import { initialState, reducer } from '../reducers/tester';

import Title from './Tester/Title';
import DonationButton from './Tester/DonationButton';
import Controls from './Tester/Controls';

const Tester = (props) => {
  const [screenName, dispatch] = React.useReducer(reducer, initialState);
  return (
    <TesterContext.Provider value={{ screenName, dispatch }}>
      <div className="flex flex-col w-screen bg-shadowblue">
        <div className="text-center">
          <Title />
          <DonationButton />
        </div>
        <Controls />
      </div>
    </TesterContext.Provider>
  );
};

export default Tester;
