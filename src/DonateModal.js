import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useModal from 'use-react-modal';
import { useSpring, animated } from 'react-spring';
import SVG from 'react-inlinesvg';

import BBText from './BBText';

const DonateModal = () => {
  const [donateClicked, setDonateClicked] = useState(false);
  const [isGone, setGone] = useState(true);
  const { t } = useTranslation('common');

  const { isOpen, openModal, closeModal, Modal } = useModal({
    background: 'rgba(0, 0, 0, 0.5)'
  });
  const props = useSpring({
    from: {
      transform: isOpen ? 'scale(0)' : 'scale(1)'
    },
    to: async next => {
      await next({ transform: isOpen ? 'scale(1)' : 'scale(0)' });
      !isOpen && setGone(true);
    }
  });

  const handleDonateClick = (evt) => {
    window.open('https://www.paypal.me/shadowban');
    setDonateClicked(true);
    closeModal(evt);
  };

  const handleOpenClick = (evt) => {
    setGone(false);
    openModal(evt);
  };

  return (
    <>
      {
        donateClicked ?
          <div className="flex justify-center">
            <SVG
              className="w-8 mr-2"
              src="https://twemoji.maxcdn.com/svg/2764.svg"
            />
            <div className="font-lobster text-accent-purple text-3xl">
              { t('donateModal.thankYou') }
            </div>
            <SVG
              className="w-8 ml-2"
              src="https://twemoji.maxcdn.com/svg/2764.svg"
            />
          </div>
        :
          <button className="uppercase" onClick={handleOpenClick}>
            support us
          </button>
      }
      {
        !isGone ? <Modal className="
          sm:w-11/12 md:w-2/3
          h-modal
          w-full
          overflow-auto
        ">
          <animated.div style={props} className="
            card
            flex flex-col justify-around
          ">
            <BBText>
              { t('donateModal.content') }
            </BBText>
            <div className="flex flex-row justify-end mt-6">
              <button className="mr-4" onClick={handleDonateClick}>
                { t('donateModal.donateButton')}
              </button>
              <button onClick={closeModal}>
                { t('donateModal.dismissButton') }
              </button>
            </div>
          </animated.div>
        </Modal>
        : null
      }
    </>
  );
};

export default DonateModal;
