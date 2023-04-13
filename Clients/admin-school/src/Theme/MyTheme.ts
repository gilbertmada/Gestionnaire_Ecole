import { createMuiTheme } from '@material-ui/core/styles';
import { frFR } from '@material-ui/data-grid';

const myTheme = createMuiTheme(
  {
    palette: {
      primary: {
        main: '#0AB1E1',
        dark: '#131F29',
        light: '#0AB1E1',
      },
      secondary: {
        main: '#BCD35B',
      },
    },
    typography: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
      fontSize: 16,
      htmlFontSize: 16,
      h1: {
        fontFamily: '"Poppins", sans-serif',
        fontSize: '2.1875rem',
        fontWeight: 700,
        textTransform: 'uppercase',
      },
      h2: {
        fontFamily: '"Poppins", sans-serif',
        fontSize: '1.5625rem',
        fontWeight: 700,
        textTransform: 'uppercase',
      },
      h3: {
        fontFamily: '"Poppins", sans-serif',
        fontSize: '1.25rem',
        fontWeight: 700,
        textTransform: 'uppercase',
      },
      h4: {
        fontFamily: '"Poppins", sans-serif',
        fontSize: '1.125rem',
        fontWeight: 700,
        textTransform: 'uppercase',
      },
      subtitle1: {
        fontFamily: '"Poppins", sans-serif',
        fontSize: '1rem',
        fontWeight: 700,
        lineHeight: 1.25,
        textTransform: 'uppercase',
      },
      body1: {
        fontFamily: '"Poppins", sans-serif',
        fontSize: '1rem',
      },
      body2: {
        fontFamily: '"Poppins", sans-serif',
        fontSize: '0.875rem',
      },
      caption: {
        fontFamily: '"Poppins", sans-serif',
        fontSize: '0.75rem',
      },
    },
    overrides: {
      MuiPaper: {
        root: {
          backgroundColor: 'transparent',
        },
        elevation2: {
          boxShadow: '0 4px 4px rgba(0,0,0,.25)',
        },
      },
      MuiTextField: {
        root: {
          marginBottom: 16,
        },
      },
      MuiOutlinedInput: {
        root: {
          backgroundColor: '#FFF',
        },
        input: {
          padding: '15.5px 14px',
          '&::placeholder': {
            color: '#BEC8E7',
          },
        },
        notchedOutline: {
          borderColor: '#FFFFFF',
        },
      },
      MuiSelect: {
        iconOutlined: {
          color: '#FFFFFF',
        },
      },
      MuiButton: {
        root: {
          height: 41,
          fontSize: '0.875rem',
          textTransform: 'uppercase',
        },
        text: {
          fontWeight: 700,
        },
        contained: {
          fontWeight: 600,
        },
        containedPrimary: {
          background: '#284853',
          color: 'white',
        },
        containedSecondary: {
          color: 'white',
        },
      },
    },
  },
  frFR
);

export default myTheme;
