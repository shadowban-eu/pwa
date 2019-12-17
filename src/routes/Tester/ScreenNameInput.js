import React from 'react';

import { TesterContext } from '../../contexts';
import { SET_SCREEN_NAME } from '../../actions';

const ScreenNameInput = () => {

  const { screenName, dispatch } = React.useContext(TesterContext);

  const prefixColorClass = screenName ? 'text-accent-purple' : 'text-twitterblue';
  const prefixClasses = `absolute w-12 left-0 text-3xl text-twitterblue text-center ${prefixColorClass}`;

  const labelClasses = screenName ? 'active text-twitterblue' : 'text-twitterblue';

  return (
    <div className="prefix-label-input relative w-64 mr-12">
      <span className={prefixClasses}>@</span>
      <input
        id="screenName"
        type="text"
        maxlength={16}
        onKeyUp={(evt) => dispatch({ type: SET_SCREEN_NAME, screenName: evt.target.value })}
        className="
          h-12
          ml-12
          border-b-2 border-gray-400
          text-accent-purple font-medium
          focus:outline-none
          focus:border-twitterblue"
      />
      <label htmlFor="screenName" className={labelClasses}>username</label>
    </div>
  );
};

export default ScreenNameInput;
