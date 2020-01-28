import React from 'react';
import BBCode from '@bbob/react/es/Component'
import reactPreset from '@bbob/preset-react/es'

import SpringyImage from './SpringyImage';
import SafeLink from './SafeLink';
import Streamable from './Streamable';

const getClassName = (attrs) => attrs && attrs.className ? attrs.className : '';

const hClasses = {
  h1: 'text-6xl',
  h2: 'text-5xl',
  h3: 'text-4xl',
  h4: 'text-3xl',
  h5: 'text-2xl',
  h6: 'text-xl'
};

const preset = reactPreset.extend(presetTags => {
  const tags = ({
    ...presetTags,
    p: (node) => ({
      tag: 'p',
      attrs: {
        className: `my-4 ${getClassName(node.attrs)}`
      },
      content: node.content
    }),
    b: (...args) => ({
      ...presetTags.b(...args),
      attrs: {
        style: {fontWeight: 500 }
      },
      content: args[0].content
    }),
    br: () => ({ tag: 'br' }),
    url: (node, ctx) => {
      const isInternal = !!node.attrs.internal;
      delete node.attrs.internal;
      const presetResult = presetTags.url(node, ctx);
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
      const direction = node.attrs.col ? 'flex-column' : 'flex-row';
      const justify = node.attrs.justify ? `justify-${node.attrs.justify}` : '';
      return ({
        tag: 'div',
        attrs: {
          className: `flex ${direction} ${wrap} ${justify}`.trim()
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
      const presetResult = presetTags.img(...args);
      return ({
        ...presetResult,
        tag: args[0].attrs.inline ? 'img' : SpringyImage,
        attrs: {
          ...presetResult.attrs,
          className: `h-full shadow-md ${
            getClassName(args[0].attrs)
          } ${
            args[0].attrs.inline ? 'inline' : ''
          } ${
            args[0].attrs.center ? '' : 'mx-auto'
          }`,
          alt: args[0].attrs.alt || '',
          width: args[0].attrs.width,
          height: args[0].attrs.height
        }
      });;
    },
    streamable: node => ({
      tag: Streamable,
      attrs: {
        src: node.attrs.src,
        className: getClassName(node.attrs) || 'relative mx-auto h-streamable shadow-md'
      }
    }),
    quote: node => ({
      tag: 'blockquote',
      attrs: {
        cite: node.attrs.cite || '',
        className: 'bg-gray-300 mx-10 my-3 p-3'
      },
      content: node.content
    })
  });

  Object.keys(hClasses).forEach((hClassKey) => {
    tags[hClassKey] = node => ({
      tag: hClassKey,
      attrs: {
        className: `${hClasses[hClassKey]} ${getClassName(node.attrs)}`
      },
      content: node.content
    });
  });

  return tags;
});

const BBText = ({ children }) => (
  <BBCode
    plugins={[preset()]}
  >
    {children}
  </BBCode>
);

export default BBText;
