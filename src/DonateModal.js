import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useModal from 'use-react-modal';
import { useSpring, animated } from 'react-spring';
import SVG from 'react-inlinesvg';
import { createStore, useStore } from 'react-hookstore';

import { initialState, reducer } from './reducers/donateModal';
import { SET_DONATE_CLICKED, SET_SEEN_CTA } from './actions/donateModal';
import BBText from './BBText';
import SafeLink from './SafeLink';

createStore('donateModal', initialState, reducer);

const DonateModal = ({ ignoreTested }) => {
  const [{ donateClicked, tested, seenCTA }, modalDispatch] = useStore('donateModal');
  const [showCrypto, setShowCrypto] = useState(false);
  const { t } = useTranslation('common');

  const { isOpen, openModal, closeModal, Modal, targetRef } = useModal({
    background: 'rgba(0, 0, 0, 0.5)',
    onClose: () => setShowCrypto(false)
  });

  const modalProps = useSpring({
    from: {
      transform: isOpen ? 'scale(0)' : 'scale(1)'
    },
    to: async next => {
      await next({ transform: isOpen ? 'scale(1)' : 'scale(0)' });
    }
  });

  const handlePaypalClick = (evt) => {
    window.open('https://www.paypal.me/shadowban');
    modalDispatch({ type: SET_DONATE_CLICKED, donateClicked: true });
    closeModal(evt);
  };

  const handleCryptoClick = () => setShowCrypto(true);

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
            { showCrypto ? <span>
                <p className="p-2">Bitcoin: 1HoCj4kaA5UNiKqi74GagVXVDQmLL8mYmV</p>
                <p className="p-2">Bitcoin Cash: qqf7nxwssjgc63cyn65meeyc88k20kpjnqgqpsap3k</p>
                <p className="p-2">Dash: Xq9WbsoreLw63RTxBUvgwc9kSzwyJN16Do</p>
                <p className="p-2">Dogecoin: DMDiUdN3B69cjj6JoTkSEb7HWQd9t2UVwP</p>
                <p className="p-2">Ethereum: 0x815438c6b414cE21543Ac5ef72d6B9FC8fFA7d07</p>
                <p className="p-2">Ethereum classic: 0x815438c6b414cE21543Ac5ef72d6B9FC8fFA7d07</p>
                <p className="p-2">Litecoin: LPPhJiJ4HkAPcWYmnY1EYitQZYKsxjbsRt</p>
                <p className="p-2">Verge: DBYizKm1CAKrvA7oaVWa2Nrus3HYsnKcYT</p>
                <p className="p-2">Zcash: t1WfHnjNYJjnUU2y4PfgZpFjc2311xaCd45</p>
                <p className="p-2">Ripple: rDJTVwTLyAV9ihVLbWSkG8XrcsNyShnVtm</p>
                <p className="p-4">If you are missing an option, please let us know by tweeting <SafeLink href="https://twitter.com/shadowbaneu">@shadowbaneu</SafeLink>!</p>
              </span>
              : <BBText>
                { t('donateModal.content', { PUBLIC_URL: process.env.PUBLIC_URL }) }
              </BBText>
            }
            <h6 className="text-xl">Thank You! :)</h6>
            <div className="flex flex-row justify-end mt-6">
              <button className="mr-4" onClick={handlePaypalClick}>
                { t('donateModal.paypalButton')}
              </button>
              <button className="mr-4" onClick={handleCryptoClick}>
                { t('donateModal.cryptoButton')}
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
