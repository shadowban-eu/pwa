import React from 'react';
import { useTranslation } from 'react-i18next';
import useModal from 'use-react-modal';
import { useSpring, animated } from 'react-spring';
import SVG from 'react-inlinesvg';
import { createStore, useStore } from 'react-hookstore';

import { initialState, reducer } from './reducers/donateModal';
import { SET_DONATE_CLICKED, SET_SEEN_CTA } from './actions/donateModal';
import BBText from './BBText';

createStore('donateModal', initialState, reducer);

const DonateModal = ({ ignoreTested }) => {
  const [{ donateClicked, tested, seenCTA }, modalDispatch] = useStore('donateModal');
  const { t } = useTranslation('common');

  const { isOpen, openModal, closeModal, Modal, targetRef } = useModal({
    background: 'rgba(0, 0, 0, 0.5)'
  });

  const props = useSpring({
    from: {
      transform: isOpen ? 'scale(0)' : 'scale(1)'
    },
    to: async next => {
      await next({ transform: isOpen ? 'scale(1)' : 'scale(0)' });
    }
  });

  const handleDonateClick = (evt) => {
    window.open('https://www.paypal.me/shadowban');
    modalDispatch({ type: SET_DONATE_CLICKED, donateClicked: true });
    closeModal(evt);
  };

  const handleOpenClick = (evt) => {
    openModal(evt);
  };

  React.useEffect(() => {
    if (!seenCTA && (tested === 7 || tested % 28 === 0)) {
      openModal();
      modalDispatch({ type: SET_SEEN_CTA, seenCTA: true })
    }
    if (seenCTA && (tested === 8 || tested % 28 === 1)) {
      modalDispatch({ type: SET_SEEN_CTA, seenCTA: false })
    }
  }, [tested, openModal, seenCTA, modalDispatch])

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
          <button ref={targetRef} className="uppercase" onClick={handleOpenClick}>
            support us
          </button>
      }
      {
        isOpen ? <Modal className="
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
              { t('donateModal.content', { PUBLIC_URL: process.env.PUBLIC_URL }) }
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
