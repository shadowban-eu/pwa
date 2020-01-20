import React from 'react';

const Streamable = (props) => {
  console.log(props);
  const { src } = props;
  const splitSrc = src.split('/');
  const embedId = splitSrc.pop();
  const videoId = splitSrc.pop();

  return (
    <div style={{
      width: '100%',
      height: 0,
      position: 'relative',
      paddingBottom: '67.059%'
    }}>
      <iframe
        src={src}
        title={`streamable-${videoId}/${embedId}`}
        frameBorder="0"
        width="100%"
        height="100%"
        allowFullScreen
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          overflow: 'hidden',
        }}></iframe></div>
  );

};

export default Streamable;
