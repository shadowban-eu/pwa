import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SVG from 'react-inlinesvg';

import SafeLink from '../SafeLink';

const coins = [
  { name: 'Bitcoin', icon: '/icons/donate/bitcoin.svg', hash: '1HoCj4kaA5UNiKqi74GagVXVDQmLL8mYmV'},
  { name: 'Bitcoin Cash', icon: '/icons/donate/bitcoin.svg', hash: 'qqf7nxwssjgc63cyn65meeyc88k20kpjnqgqpsap3k'},
  { name: 'Dash', icon: '/icons/donate/bitcoin.svg', hash: 'Xq9WbsoreLw63RTxBUvgwc9kSzwyJN16Do'},
  { name: 'Dogecoin', icon: '/icons/donate/bitcoin.svg', hash: 'DMDiUdN3B69cjj6JoTkSEb7HWQd9t2UVwP'},
  { name: 'Ethereum', icon: '/icons/donate/bitcoin.svg', hash: '0x815438c6b414cE21543Ac5ef72d6B9FC8fFA7d07'},
  { name: 'Ethereum Classic', icon: '/icons/donate/bitcoin.svg', hash: '0x815438c6b414cE21543Ac5ef72d6B9FC8fFA7d07'},
  { name: 'Litecoin', icon: '/icons/donate/bitcoin.svg', hash: 'LPPhJiJ4HkAPcWYmnY1EYitQZYKsxjbsRt'},
  { name: 'Verge', icon: '/icons/donate/bitcoin.svg', hash: 'DBYizKm1CAKrvA7oaVWa2Nrus3HYsnKcYT'},
  { name: 'Zcash', icon: '/icons/donate/bitcoin.svg', hash: 't1WfHnjNYJjnUU2y4PfgZpFjc2311xaCd45'},
  { name: 'Ripple', icon: '/icons/donate/bitcoin.svg', hash: 'rDJTVwTLyAV9ihVLbWSkG8XrcsNyShnVtm'}
];

const Coin = ({ coin }) => {
  const [copied, setCopied] = useState(null);

  const onCopy = (text, copied) => setCopied(copied);

  return (
    <CopyToClipboard text={coin.hash} key={coin.name} onCopy={onCopy}>
      <div className="p-2 inline cursor-pointer">
        {
          copied === null ?
            <SVG className="inline mr-2" src={coin.icon} width={24} height={24} />
          :
            <SVG
              className="inline mr-2"
              src={copied === true ? '/icons/check.svg' : 'icons/ban.svg'}
              width={24} height={24}
            />
        }
        <span className="hover:underline">{coin.name}</span>
      </div>
    </CopyToClipboard>
  );
};

const Cryptos = () => {
  return (
    <div>
      <p className="p-2">Click to copy the address to your clipboard!</p>
      <div className="flex flex-wrap">
      {
        coins.map(coin => <Coin coin={coin} />)
      }
      </div>
      <p className="p-4">If you are missing an option, please let us know by tweeting <SafeLink href="https://twitter.com/shadowbaneu">@shadowbaneu</SafeLink>!</p>
    </div>
  );
}

export default Cryptos;
