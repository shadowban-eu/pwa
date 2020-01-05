import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useModal from 'use-react-modal';
import { useTransition, animated } from 'react-spring';
import SVG from 'react-inlinesvg';

import BBText from './BBText';

const DonateModal = () => {
  const [donateClicked, setDonateClicked] = useState(false);
  const { t } = useTranslation('common');
  const { isOpen, openModal, closeModal, Modal } = useModal({
    background: 'rgba(0, 0, 0, 0.5)'
  });
  const transitions = useTransition(isOpen, null, {
    from: {
      transform: 'scale(0)'
    },
    enter: {
      transform: 'scale(1)'
    },
    leave: {
      transform: 'scale(0)'
    }
  });

  const handleDonateClick = (evt) => {
    window.open('https://www.paypal.me/shadowban');
    setDonateClicked(true);
    closeModal(evt);
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
              Thank you for your support!
            </div>
            <SVG
              className="w-8 ml-2"
              src="https://twemoji.maxcdn.com/svg/2764.svg"
            />
          </div>
        :
          <button className="uppercase" onClick={openModal}>
            support us
          </button>
      }
      {
        isOpen ? <Modal className="
          sm:w-11/12 md:w-2/3
          h-modal
          overflow-auto
        ">
          {
            transitions.map(({ item, props, key }) => (
              item ?
                <animated.div key={key} style={props} className="
                  card
                  flex flex-col justify-around
                ">
                <BBText>
                  { t('donateModal.content') }
                </BBText>
                <div className="flex flex-row justify-end">
                  <button className="mr-4" onClick={handleDonateClick}>
                    { t('donateModal.donateButton')}
                  </button>
                  <button onClick={closeModal}>
                    { t('donateModal.dismissButton') }
                  </button>
                </div>
              </animated.div>
              : null
            ))
          }
        </Modal>
        : null
      }
    </>
  );
};

export default DonateModal;
