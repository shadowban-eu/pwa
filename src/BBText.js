import React from 'react';
import BBCode from '@bbob/react/es/Component'
import reactPreset from '@bbob/preset-react/es'

import SpringyImage from './SpringyImage';
import SafeLink from './SafeLink';
import Streamable from './Streamable';

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
  }),
  img: (...args) => {
    const presetResult = tags.img(...args);
    return ({
      ...presetResult,
      tag: args[0].attrs.inline ? 'img' : SpringyImage,
      attrs: {
        ...presetResult.attrs,
        className: `h-full mx-auto shadow-md ${getClassName(args[0].attrs)} ${args[0].attrs.inline ? 'inline' : ''}`,
        alt: args[0].attrs.alt || '',
        width: args[0].attrs.width,
        height: args[0].attrs.height
      }
    });;
  },
  streamable: node => ({
    tag: Streamable,
    attrs: {
      src: node.attrs.src
    }
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
