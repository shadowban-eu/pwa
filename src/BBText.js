import React from 'react';
import BBCode from '@bbob/react/es/Component'
import reactPreset from '@bbob/preset-react/es'

import SafeLink from './SafeLink';

const getClassName = (attrs) => attrs && attrs.className ? attrs.className : '';

const preset = reactPreset.extend(tags => ({
  ...tags,
  p: (node) => ({
    tag: 'p',
    attrs: {
      className: `my-4 ${getClassName(node.attrs)}`
    },
    content: node.content
  }),
  b: (...args) => ({
    ...tags.b(...args),
    attrs: {
      style: {fontWeight: 500 }
    },
    content: args[0].content
  }),
  h4: node => ({
    tag: 'div',
    attrs: {
      className: `text-4xl ${node.attrs.className}`
    },
    content: node.content
  }),
  h6: node => ({
    tag: 'div',
    attrs: {
      className: `text-2xl ${node.attrs.className}`
    },
    content: node.content
  }),
  br: () => ({ tag: 'br' }),
  url: (node, ctx) => {
    const isInternal = !!node.attrs.internal;
    delete node.attrs.internal;
    const presetResult = tags.url(node, ctx);
    return ({
      ...presetResult,
      tag: isInternal ? 'a' : SafeLink
    });
  },
  purple: node => ({
    tag: 'span',
    attrs: {
      className: 'text-accent-purple'
    },
    content: node.content
  }),
  flex: node => {
    const wrap = node.attrs.wrap ? 'flex-wrap' : '';
    const justify = node.attrs.justify ? `justify-${node.attrs.justify}` : '';
    return ({
      tag: 'div',
      attrs: {
        className: `flex flex-row ${wrap} ${justify}`.trim()
      },
      content: node.content
    });
  },
  ul: node => ({
    tag: 'ul',
    attrs: {
      className: 'pl-10 list-disc'
    },
    content: node.content
  }),
  li: node => ({
    tag: 'li',
    content: node.content
  })
}));

const BBText = ({ children }) => (
  <BBCode
    plugins={[preset()]}
  >
    {children}
  </BBCode>
);

export default BBText;
