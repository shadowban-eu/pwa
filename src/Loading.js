import React from 'react';
import SVG from 'react-inlinesvg';

const Loading = () => (
  <div className="w-full h-screen bg-shadowblue">
    <SVG
      className="mx-auto w-1/3"
      src="/favicon/favicon.svg"
      alt="Loading..."
    />
    <h2 className="
      block mx-auto
      font-lobster leading-title
      text-title text-center
      text-twitterblue
      loading-animation
    ">Loading...</h2>
  </div>
);

export default Loading;
