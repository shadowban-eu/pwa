import React from 'react';

import ScreenNameInput from './ScreenNameInput';

const Controls = () => {
  return (
    <div className="
      offset-m1 m10 offset-l2 l8
      flex
      justify-center
      sm:w-full md:w-10/12 lg:w-8/12
      mt-10 mb-5
      ml-auto mr-auto
      p-5
      bg-white
      shadow-md
      rounded
    ">
      <ScreenNameInput />
      <button className="uppercase self-center">Check</button>
    </div>
  );
};

export default Controls;
