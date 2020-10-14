module.exports = {
  theme: {
    extend: {
      colors: {
        shadowblue: 'rgb(230, 236, 240)',
        twitterblue: 'rgb(20, 129, 195)',
        accent: {
          purple: 'rgb(175, 52, 175)',
          success: 'rgb(8, 136, 16)',
          warn: 'orange',
          error: 'rgb(197, 61, 61)'
        },
        placeholder: '#ced4da'
      },
      fontFamily: {
        lobster: ['Lobster', 'cursive']
      },
      fontSize: {
        title: '3.56rem',
        smtitle: '2.56rem',
        base: '.875rem'
      },
      lineHeight: {
        title: '110%'
      },
      height: {
        modal: '90%',
        streamable: 'calc(100vh / 2)',
        coin: '24px'
      },
      minHeight: {
        results: '328px',
        header: '3rem'
      },
      width: {
        coin: '24px'
      },
      rotate: {
        bcash: '-25deg'
      }
    }
  },
  variants: {
    fontSize: ['responsive']
  },
  plugins: []
};
