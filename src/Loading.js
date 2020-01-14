import React from 'react';
import SVG from 'react-inlinesvg';

const Loading = () => (
  <div className="w-full h-screen loadable-container">
    <SVG
      className="mx-auto w-full"
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
