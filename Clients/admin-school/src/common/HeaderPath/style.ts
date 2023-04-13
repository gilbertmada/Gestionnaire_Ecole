import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  link: {
    background: '#107BDF',
    color: 'white',
    zIndex: 2,
    padding: '0px 10px 0px 10px',
    height: '30px',
    display: 'block',
    width: 'fit-content',
  },
  linkBody: {
    color: 'white',
    textDecoration: 'none',
  },
  linkDash: {
    background: '#107BDF',
    color: 'white',
    zIndex: 2,
    padding: '0px 10px 0px 10px',
    height: '30px',
    display: 'block',
    width: 'fit-content',
    position: 'absolute',
    left: "310px",
    [theme.breakpoints.down('sm')]: {
      left: "0px",
    },
  }
}));

export default useStyles;
