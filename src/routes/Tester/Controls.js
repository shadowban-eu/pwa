import React from 'react';

import ScreenNameInput from './ScreenNameInput';

const Controls = () => {
  return (
    <div className="
      flex
      justify-center
      sm:w-full md:w-4/5
      mt-10 mb-5
      ml-auto mr-auto
      p-5
      bg-white
      shadow-md
      rounded
    ">
      <ScreenNameInput />
      <button className="uppercase">Check</button>
    </div>
  );
};

export default Controls;
