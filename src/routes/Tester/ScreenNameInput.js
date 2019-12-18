import React from 'react';
import { useStore } from 'react-hookstore';

import { SET_SCREEN_NAME, VALIDATE_SCREEN_NAME } from '../../actions';

const twitterHandleRX = /^[A-Za-z0-9_]{1,15}$/;

const ScreenNameInput = () => {
  const [{ screenName, valid }, dispatch] = useStore('tester');
  const inputElement = React.useRef(null);

  // pretty sure this is wrong; feels wrong...
  const prefixColorClass = screenName
    ? valid ? 'text-accent-purple' : 'text-accent-error'
    : 'text-twitterblue';

  const inputColorClasses = valid
    ? 'border-gray-400 text-accent-purple focus:border-twitterblue'
    : 'border-accent-error text-accent-error focus:border-accent-error';

  const labelClasses = screenName
    ? valid ? 'active text-twitterblue' : 'active text-accent-error'
    : 'text-twitterblue';

    const handleKeyUp = (evt) => {
      evt.preventDefault();
      dispatch({ type: SET_SCREEN_NAME, screenName: inputElement.current.value });
      dispatch({ type: VALIDATE_SCREEN_NAME, screenName: inputElement.current.value });
    }

  return (
    <div className="prefix-label-input relative w-64 mr-12">
      <span className={`absolute w-12 left-0 text-3xl text-center ${prefixColorClass}`}>@</span>
      <input
        id="screenName"
        type="text"
        ref={inputElement}
        maxLength={15}
        pattern={twitterHandleRX.source}
        autoComplete="username"
        onKeyUp={handleKeyUp}
        className={`h-12 ml-12 border-b-2 font-medium focus:outline-none ${inputColorClasses}`}
      />
      <label htmlFor="screenName" className={labelClasses}>username</label>
    </div>
  );
};

export default ScreenNameInput;
