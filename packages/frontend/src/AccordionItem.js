import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const AccordionItem = ({ children, id = `accordion-${Math.round(Math.random() * 1000)}` }) => {
  const [isOpen, setOpen] = useState(false);
  const contentProps = useSpring({
    to: {
      maxHeight: isOpen ? '100' : '0vh'
    }
  });

  let Header, Contents;
  try {
    [Header, ...Contents] = children;
  } catch (err) {
    console.error('AccordionItem needs at least 2 child elements. 1st for the label and 2nd+ for the content!');
    throw err;
  }

  return (
    <div className="tab w-full overflow-hidden">
      <input
        className="absolute opacity-0 "
        id={id}
        type="checkbox"
        name={id}
        onChange={() => setOpen(!isOpen)}
      />
      <label
        className={
          `flex block p-5 leading-normal cursor-pointer ${isOpen ? '' : 'border-b'}`
        }
        htmlFor={id}
      >
        <div className={`inline flex-grow ${Header.props.className || ''}`}>
          {Header.props.children}
        </div>
        <div className="accordion-indicator flex-shrink-0">&#x25BE;</div>
      </label>
      {
        <animated.div style={contentProps} className="overflow-auto relative">
          {
            Contents.map(Content => Content)
          }
        </animated.div>
      }
    </div>
  );
};

export default AccordionItem;
