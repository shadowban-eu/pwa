import React from 'react';
import { createStore } from 'react-hookstore';

import { initialState, reducer } from '../reducers/tester';

import Title from './Tester/Title';
import DonationButton from './Tester/DonationButton';
import Controls from './Tester/Controls';

createStore('tester', initialState, reducer);

const Tester = (props) => {
  return (
    <div className="flex flex-col w-screen bg-shadowblue">
      <div className="text-center">
        <Title />
        <DonationButton />
      </div>
      <Controls />
    </div>
  );
};

export default Tester;
