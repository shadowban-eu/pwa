import React, { useState, useRef, useEffect } from 'react';
import { useSpring, useTransition, animated } from 'react-spring';
import ScrollMagic from 'scrollmagic';


const calculateTranslations = (maximized, imageRef) => {
  if (!maximized) {
    return {
      offsetX: 0,
      offsetY: 0,
      scale: 1
    };
  }
  const { x, y, width, height } = imageRef.current.getBoundingClientRect();
  const offsetX = (document.body.clientWidth / 2) - x - width / 2;
  const offsetY = (window.innerHeight / 2) - y - height / 2;
  const scaleW = (document.body.clientWidth * 0.75) / width;
  const scaleH = (window.innerHeight * 0.75) / height;
  const scale = Math.min(scaleW, scaleH);
  return {
    offsetX, offsetY, scale
  };
};

const toggleModal = (setState, imageAnimationRef, show) => setState({
  maximized: show,
  translations: calculateTranslations(show, imageAnimationRef)
});

const createScrollSpy = ({ onLeave }) => {
  const controller = new ScrollMagic.Controller();
  const scene = new ScrollMagic.Scene({
    duration: 50,
    offset: window.scrollY
  });

  scene.addTo(controller);
  scene.on('leave', onLeave);

  return { controller, scene };
};

const destroyScrollSpy = ({ controller, scene }) => {
  controller.destroy(true);
};

const SpringyImage = ({ src, className, alt, width = '100%', height }) => {
  const imageAnimationRef = useRef();
  const [{ maximized, translations }, setState] = useState({
    maximized: false,
    translations: {
      offsetX: 0,
      offsetY: 0,
      scale: 1
    }
  });

  const imageAnimationProps = useSpring({
    transform: `translate(${translations.offsetX}px, ${translations.offsetY}px) scale(${translations.scale})`
  });

  const backdropTransitions = useTransition(maximized, null, {
    from: {
      opacity: 0
    },
    enter: {
      opacity: 1
    },
    leave: {
      opacity: 0
    }
  });

  useEffect(() => {
    if (maximized) {
      const scrollSpy = createScrollSpy({
        onLeave: () => {
           toggleModal(setState, imageAnimationRef, false);
           destroyScrollSpy(scrollSpy);
        }
      });
      return () => destroyScrollSpy(scrollSpy);
    }
  }, [maximized])

  return (
    <div className={className}>
      <animated.div
        style={imageAnimationProps}
        className={`relative ${maximized ? 'z-20' : ''}`}
        ref={imageAnimationRef}
      >
        <img
          src={src}
          className="cursor-pointer"
          alt={alt}
          width={width}
          height={height}
          onClick={() => toggleModal(setState, imageAnimationRef, !maximized)}
        />
      </animated.div>
      {
        backdropTransitions.map(({ item, key, props }) => (
          item && <animated.div
            key={key} style={props}
            className="bg-shadowblue w-screen h-screen fixed top-0 left-0 z-10"
            onClick={() => toggleModal(setState, imageAnimationRef, false)}
          ></animated.div>
        ))
      }
    </div>
  );
};

export default SpringyImage;
