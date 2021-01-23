import React from 'react';
import { useTranslation } from 'react-i18next';

import BBText from '../../BBText';
import Accordion from '../../Accordion';
import AccordionItem from '../../AccordionItem';

const QFDLegacyFAQ = () => {
  const { t } = useTranslation('functionality');
  return (
    <Accordion>
      <AccordionItem id="notificationSetting">
        <div>{t('qfdLegacy.notificationSetting.title')}</div>
        <div className="px-8 pb-6 border-b">
          <BBText>
            {t('qfdLegacy.notificationSetting.text')}
          </BBText>
        </div>
      </AccordionItem>
      <AccordionItem id="reasons">
        <div>{t('qfdLegacy.reasons.title')}</div>
        <div className="px-8 pb-6 border-b">
          <BBText>
            {t('qfdLegacy.reasons.text')}
          </BBText>
        </div>
      </AccordionItem>
      <AccordionItem id="solution">
        <div>{t('qfdLegacy.solution.title')}</div>
        <div className="px-8 pb-6 border-b">
          <BBText>
            {t('qfdLegacy.solution.text')}
          </BBText>
        </div>
      </AccordionItem>
      <AccordionItem id="politicalBias">
        <div>{t('qfdLegacy.politicalBias.title')}</div>
        <div className="px-8 pb-6 border-b">
          <BBText>
            {t('qfdLegacy.politicalBias.text')}
          </BBText>
        </div>
      </AccordionItem>
      <AccordionItem id="affected">
        <div>{t('qfdLegacy.affected.title')}</div>
        <div className="px-8 pb-6 border-b">
          <BBText>
            {t('qfdLegacy.affected.text')}
          </BBText>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

const FAQ = () => {
  const { t } = useTranslation('functionality');
  return (
    <Accordion>
      <AccordionItem id="limitVisibility">
        <BBText>
          <span className="inline-block text-accent-purple">
            {t('limitVisibility.title')}
          </span>
          <br />
          <span className="inline-block line-through">
            {t('noShadowbanClaim.title')}
          </span>
        </BBText>
        <div className="px-8 pb-6">
          <BBText>
            {t('limitVisibility.text')}
          </BBText>
        </div>
        <div className="
          px-8 pb-6 border-b
          text-gray-500 hover:text-black
          line-through hover:no-underline
        ">
          <BBText>
            {t('noShadowbanClaim.text')}
          </BBText>
        </div>
      </AccordionItem>
      <AccordionItem id="qfdTestGone">
        <BBText>{t('qfdTestGone.title')}</BBText>
        <div className="px-8 pb-6 border-b">
          <BBText>
            {t('qfdTestGone.text')}
          </BBText>
          <QFDLegacyFAQ />
        </div>
      </AccordionItem>
      <AccordionItem id="functionality">
        <BBText>{t('testerFunctions.title')}</BBText>
        <div className="px-8 pb-6 border-b">
          <BBText>{t('testerFunctions.text')}</BBText>
        </div>
      </AccordionItem>
      <AccordionItem id="science">
        <BBText>{t('scienceInfo.title')}</BBText>
        <div className="px-8 pb-6 border-b">
          <BBText>{t('scienceInfo.text')}</BBText>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default FAQ;
