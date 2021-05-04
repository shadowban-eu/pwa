import React, { useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SVG from 'react-inlinesvg';

import SafeLink from '../SafeLink';

const coins = [
  {
    name: 'Cardano',
    asset: 'ADA',
    icon: 'icons/donate/coins/ada.svg',
    hash:
      'addr1q9cpns6gwke4p5xt868tm5a9huvcl6vpust4hjt2qq3xrqvf2r5tf6t9s6n98fqzk0mkr6ghawtpywave33cxmsun6csj8kjr7'
  },
  {
    name: 'Bitcoin',
    asset: 'BTC',
    icon: '/icons/donate/coins/bitcoin.svg',
    hash: '1HoCj4kaA5UNiKqi74GagVXVDQmLL8mYmV'
  },
  {
    name: 'Bitcoin Cash',
    asset: 'BCH',
    icon: '/icons/donate/coins/bitcoin.svg',
    className: 'transform rotate-bcash',
    hash: 'qqf7nxwssjgc63cyn65meeyc88k20kpjnqgqpsap3k'
  },
  {
    name: 'Dash',
    asset: 'DASH',
    icon: '/icons/donate/coins/dash.svg',
    hash: 'Xq9WbsoreLw63RTxBUvgwc9kSzwyJN16Do'
  },
  {
    name: 'Dogecoin',
    asset: 'DOGE',
    icon: '/icons/donate/coins/dogecoin.svg',
    hash: 'DMDiUdN3B69cjj6JoTkSEb7HWQd9t2UVwP'
  },
  {
    name: 'Ethereum',
    asset: 'ETH',
    icon: '/icons/donate/coins/ethereum.svg',
    hash: '0x815438c6b414cE21543Ac5ef72d6B9FC8fFA7d07'
  },
  {
    name: 'Ethereum Classic',
    asset: 'ETC',
    icon: '/icons/donate/coins/ethereum_classic.svg',
    hash: '0x815438c6b414cE21543Ac5ef72d6B9FC8fFA7d07'
  },
  {
    name: 'Litecoin',
    asset: 'LTC',
    icon: '/icons/donate/coins/litecoin.svg',
    hash: 'LPPhJiJ4HkAPcWYmnY1EYitQZYKsxjbsRt'
  },
  {
    name: 'Verge',
    asset: 'XVG',
    icon: '/icons/donate/coins/verge.svg',
    hash: 'DBYizKm1CAKrvA7oaVWa2Nrus3HYsnKcYT'
  },
  {
    name: 'Zcash',
    asset: 'ZEC',
    icon: '/icons/donate/coins/zcash.svg',
    hash: 't1WfHnjNYJjnUU2y4PfgZpFjc2311xaCd45'
  },
  {
    name: 'Ripple',
    asset: 'XRP',
    icon: '/icons/donate/coins/ripple.svg',
    hash: 'rDJTVwTLyAV9ihVLbWSkG8XrcsNyShnVtm'
  }
];

const Coin = ({ coin }) => {
  const [copied, setCopied] = useState(null);
  const onCopy = (_, copied) => setCopied(copied);

  return (
    <CopyToClipboard text={coin.hash} key={coin.name} onCopy={onCopy}>
      <div className="p-2 flex cursor-pointer">
        <div className="inline-block w-coin h-coin mr-2 align-middle">
          {copied === null ? (
            <SVG
              className={`inline mr-2 ${coin.className ? coin.className : ''}`}
              src={coin.icon}
              width={24}
              height={24}
            />
          ) : (
            <SVG
              className="inline mr-2"
              src={copied === true ? '/icons/check.svg' : 'icons/ban.svg'}
              width={24}
              height={24}
            />
          )}
        </div>
        <div className="font-hairline w-12">{coin.asset}</div>
        <div className="hover:underline">{coin.name}</div>
      </div>
    </CopyToClipboard>
  );
};

const Cryptos = () => {
  return (
    <div>
      <p className="p-2">Click to copy the address to your clipboard!</p>
      <ul>
        {coins.map((coin) => (
          <li className="p-1" key={coin.asset}>
            <Coin coin={coin} key={coin.name} />
          </li>
        ))}
      </ul>

      <p className="p-4">
        If you are missing an option, please let us know by tweeting{' '}
        <SafeLink href="https://twitter.com/shadowban_eu">
          @shadowban_eu
        </SafeLink>
        !
      </p>
    </div>
  );
};

export default Cryptos;
