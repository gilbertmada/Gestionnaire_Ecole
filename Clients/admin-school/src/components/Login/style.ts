import makeStyles from '@material-ui/core/styles/makeStyles';

const flexDisplay = {
  display: 'flex',
  alignItems: "center"
};

const displayFormContainer = {
  display: 'flex',
  flexDirection: 'column',
}

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: '#1E2A43',
    backgroundColor: '#8D66FA',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    // paddingTop: '15vh',
  },
  container: {
    // margin: 'auto',
    width: '40%',
    height: "82%",
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down('sm')]: {
      width: '80vw',
    },
    '& img:nth-child(1)': {
      width: "100%",
      height: '80%',
    },
    '& img:nth-child(2)': {
      width: "414px",
      transform: "translateY(-41px)",
    },
    '&:hover': {
      cursor: 'pointer'
    }
  },
  leftBox: {
    backgroundColor: '#131F29',
    width: '25vw',
    height: '70vh',
    '& img': {
      width: '90%',
      marginLeft: '5%',
      marginTop: '25vh',
    },
  },
  rightBox: {
    width: '25vw',
    padding: '20px 0',
    height: '70vh',
    border: '2px solid #0AB1E1',
    borderLeft: 0,
    paddingTop: '15vh',
    backgroundColor: '#fff',
  },
  formGroup: {
    display: 'flex',
    width: '90%',
    marginLeft: '5%',
    '& .MuiTextField-root': {
      width: '100%',
    },
    '& svg': {
      marginTop: '15px',
      marginRight: '10px',
    },
  },
  usernameInput: {
    ...flexDisplay,
    '& img': {
      width: '33px',
      transform: "translateX(16px)",
      zIndex: '10',
    }
  },
  passwordInput: {
    marginTop: '5px',
    ...flexDisplay,
    position: 'relative',
    '& svg:nth-child(3)': {
      position: 'absolute',
      right: '3px',
      cursor: 'pointer',
    }
  },
  svg: {
    color: "#dadbe0"
  },
  textCenter: {
    marginTop: '5px',
    textAlign: 'center',
    width: '90%',
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: '1.5em',
  },
  small: {
    fontSize: '0.8em',
  },
  coloredIcon: {
    color: '#0AB1E1',
    cursor: 'pointer',
  },
  marginTop: {
    marginTop: '30px',
  },
  logbtn: {
    width: '100%',
    borderRadius: "5px",
    fontWeight: 'bold',
    textTransform: "unset",
  },
  formContainerHidden: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    transform: "translateY(-900px)",
    visibility: 'hidden',
  },
  formContainerFadeOut: {
    opacity: '0',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    transform: "translateY(-900px)",
    visibitiy: 'hidden',
    animation: `$fadeOut 100ms`,
  },
  formContainerFadeIn: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    animation: `$fadeIn 300ms ${theme.transitions.easing.easeIn}`
  },

  "@keyframes fadeIn": {
    "0%": {
      transform: "translateY(-900px)",
      opacity: '0'
    },
    "70%": {
      opacity: '0.2'
    },
    "90%": {
      opacity: '0.5'
    },
    "100%": {
      transform: "translateY(-50px)",
      opacity: '1'
    }
  },
  "@keyframes fadeOut": {
    "0%": {
      transform: "translateY(-50px)",
      opacity: '1'
    },
    "70%": {
      opacity: '0.8'
    },
    "90%": {
      opacity: '0.5'
    },
    "100%": {
      transform: "translateY(-900px)",
      opacity: '0',
    }
  } 
}));

export default useStyles;
