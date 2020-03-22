import React from 'react';
import { useStore } from 'react-hookstore';
import { useTranslation } from 'react-i18next';

import { SET_SCREEN_NAME, VALIDATE_SCREEN_NAME } from '../../actions/tester';
import { twitterHandleRX } from '../../utils';

const ScreenNameInput = () => {
  const [{ screenName, valid }, dispatch] = useStore('tester');
  const { t } = useTranslation('common');
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
    const screenName = inputElement.current.value.replace('@', '');
    inputElement.current.value = screenName;
    dispatch({ type: SET_SCREEN_NAME, screenName: screenName });
    dispatch({ type: VALIDATE_SCREEN_NAME, screenName: screenName });
  };

  React.useEffect(() => {
    inputElement.current.value = screenName;
  }, [inputElement, screenName]);

  return (
    <div className="prefix-label-input relative sm:w-64 w-2/3 my-4 mr-0 sm:mr-4">
      <span className={
        `absolute w-12 left-0 text-3xl text-center font-lobster ${prefixColorClass}`
      }>
        @
      </span>
      <input
        id="screenName"
        type="text"
        ref={inputElement}
        maxLength={15}
        pattern={twitterHandleRX.source}
        autoComplete="username"
        onChange={handleKeyUp}
        className={`h-12 ml-12 border-b-2 font-medium focus:outline-none ${inputColorClasses}`}
      />
      <label htmlFor="screenName" className={labelClasses}>{t('screenNameDefault')}</label>
    </div>
  );
};

export default ScreenNameInput;
