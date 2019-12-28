import React from 'react';
import { useTranslation } from 'react-i18next';

const ResultDetails = ({ testKey, ...props }) => {
  const { t } = useTranslation('tasks');

/*    <div className="
      card
      self-center
      min-h-results
      sm:w-full md:w-10/12 lg:w-8/12
      mt-10 mb-5 ml-auto mr-auto
    ">*/
  return (
      <div className="flex flex-row p-5">
        <div
          className="
            result-details-close
            flex-1 h-full
            w-full sm:w-full md:w-10/12 lg:w-8/12
            self-center
            mx-2
            border-r-2 border-gray-400
            cursor-pointer"
          onClick={() => window.history.back()}
          ></div>
        <div className="flex flex-col">
          <div className="mb-2 text-2xl">
            {t(`${testKey}.message`)}
          </div>
          <div>
            {t(`${testKey}.description`)}
          </div>
        </div>
      </div>
  );
}

export default ResultDetails;
