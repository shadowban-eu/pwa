import React from 'react';

const Accordion = ({ children }) => {
  return (
    <div className="
      card
      flex flex-col
      w-full
      self-center
      w-full sm:w-full md:w-10/12 lg:w-8/12
      mt-10 mb-5
      ml-auto mr-auto
      overflow-hidden
      p-0
    ">
      {children}
    </div>
  );
};

export default Accordion;
