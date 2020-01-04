import React from 'react';
import { useTranslation } from 'react-i18next';
import useModal from 'use-react-modal';

import BBText from './BBText';

const DonateModal = () => {
  const { t } = useTranslation('common');
  const { isOpen, openModal, closeModal, Modal } = useModal({
    background: 'rgba(0, 0, 0, 0.5)'
  });

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
        isOpen ?
          <Modal
            className="
              card
              flex flex-col justify-around
              sm:w-11/12 md:w-2/3
              h-modal
              overflow-auto
            "
          >
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
          </Modal>
          : null
      }
    </>
  );
};

export default DonateModal;
