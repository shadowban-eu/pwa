import React from 'react';

const Streamable = ({ src, className }) => {
  const splitSrc = src.split('/');
  const embedId = splitSrc.pop();
  const videoId = splitSrc.pop();

  return (
    <div className={className}>
      <iframe
        src={src}
        title={`streamable-${videoId}/${embedId}`}
        frameBorder="0"
        width="100%"
        height="100%"
        allowFullScreen
        className="w-full h-full absolute left-0 top-o overflow-hidden"
      ></iframe>
    </div>
  );

};

export default Streamable;
