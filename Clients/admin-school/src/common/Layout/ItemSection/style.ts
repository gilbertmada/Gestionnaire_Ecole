import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  top: {
    padding: '1vh',
  },
  card: {
    height: '15vh',
    width: '100%',
    marign: '10vh auto',
    // boxShadow: '1px 1px 12px #CDCDCD',
    boxShadow: 'inset rgba(0, 0, 0, 0.15) 0px 2px 2px;',
    // border: '4px solid transparent',
    border: '1px solid #eee',
    // borderRadius: 5,
    borderRadius: '20px 20px 20px 20px',
    '&:hover': {
      // border: '4px solid #0AB1E1',
      boxShadow: '#107BDF 0.2px 2.95px 4px',
    },
    '& .MuiCardContent-root': {
      padding: '5px !important',
    },
  },
  img: {
    width: '5vh',
    height: '5vh',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
  },
  container: {
    width: '90%',
    margin: '0 auto',
    padding: '5vh 0',
  },
  title: {
    margin: '6px 0 !important',
  },
});

export default useStyles;
