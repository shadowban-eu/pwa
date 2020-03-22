import React from 'react';
import { useTranslation } from 'react-i18next';
import useModal from 'use-react-modal';
import { useSpring, animated } from 'react-spring';
import SVG from 'react-inlinesvg';
import { createStore, useStore } from 'react-hookstore';

import { initialState, reducer } from './reducers/donateModal';
import { SET_DONATE_CLICKED, SET_SEEN_CTA } from './actions/donateModal';
import BBText from './BBText';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';
import Cryptos from './DonateModal/Cryptos';

createStore('donateModal', initialState, reducer);

const DonateModal = ({ ignoreTested }) => {
  const [{ donateClicked, tested, seenCTA }, modalDispatch] = useStore('donateModal');
  const { t } = useTranslation('common');

  const { isOpen, openModal, closeModal, Modal, targetRef } = useModal({
    background: 'rgba(0, 0, 0, 0.5)'
  });

  const modalProps = useSpring({
    from: {
      transform: isOpen ? 'translateY(-200px)' : 'translateY(0px)',
      opacity: isOpen ? 0 : 1
    },
    to: async next => {
      await next({
        transform: isOpen ? 'translateY(0px)' : 'translateY(-200px)',
        opacity: isOpen ? 1 : 0
      });
    }
  });

  const handlePaypalClick = (evt) => {
    window.open('https://www.paypal.me/shadowban');
    modalDispatch({ type: SET_DONATE_CLICKED, donateClicked: true });
    closeModal(evt);
  };

  const handleOpenClick = (evt) => openModal(evt);

  React.useEffect(() => {
    if (!seenCTA && tested !== 0 && (tested === 7 || tested % 28 === 0)) {
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
          <animated.div style={modalProps} className="
            card
            flex flex-col justify-around
          ">
            <h4 className="text-accent-purple text-3xl">Support Us</h4>
            <BBText>
              { t('donateModal.content', { PUBLIC_URL: process.env.PUBLIC_URL }) }
            </BBText>
            <div className="flex flex-row justify-start mt-6">
              <button className="mr-4" onClick={handlePaypalClick}>
                <SVG className="inline mr-4" src="/icons/donate/paypal.svg" width={32} height={32} />
                <span className="text-l">PayPal</span>
              </button>
            </div>
            <Accordion>
              <AccordionItem>
                <div>
                  <SVG className="inline mr-4" src="/icons/donate/crypto.svg" width={32} height={32} />
                  <span className="text-l">Crypto Currencies</span>
                </div>
                <Cryptos />
              </AccordionItem>
              <AccordionItem>
                <div>
                  <SVG className="inline mr-4" src="/icons/donate/gpay.svg" width={32} height={32} />
                  <span className="text-l">GPay</span>
                </div>
                <div className="p-4">You can donate to us by sending to shadowban.eu@gmail.com</div>
              </AccordionItem>
            </Accordion>
            <h6 className="text-xl">Thank You! :)</h6>
            <div className="flex flex-row justify-end mt-6">
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
