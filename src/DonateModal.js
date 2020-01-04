import React from 'react';
import { useTranslation } from 'react-i18next';
import useModal from 'use-react-modal';
import { useTransition, animated } from 'react-spring';

import BBText from './BBText';

const DonateModal = () => {
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
  })

  const handleDonateClick = (evt) => {
    window.open('https://www.paypal.me/shadowban');
    closeModal(evt);
  };

  return (
    <>
      <button className="uppercase" onClick={openModal}>
        support us
      </button>
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
