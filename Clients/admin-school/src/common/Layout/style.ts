import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '70px',
    borderBottom: '4px solid #0AB1E1',
    [theme.breakpoints.down('sm')]: {
      backgroundColor: 'yellow',
    },
  
  },
  paper: {
    background: '#F3F3F3',
  },
  hidden:{
    display:'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      marginTop: '12px',
    }
  },
  container: {
    position: 'absolute',
    top: '70px',
    width: '100%',
  },
  menu: {
    alignContent: 'center',
    height: '70px',
    padding: '10px 10px 10px 10px',
    background: '#2196f3',
    position: 'fixed',
    top: 0,
    zIndex: 10,
    borderBottom: '4px solid #107BDF',
  },
  logo: {
    height: '50px',
    width: '160px',
    cursor: 'pointer',
  },
  list: {
    width: '100%',
    paddingTop: 70,
    paddingLeft: 15,
    height: '100vh',
    background: '#F5F5F5',
    overflowY: 'auto',
    zIndex: 300000,
  },
  textCenter: {
    textAlign: 'center',
  },
  customButton: {
    minHeight: 100,
    minWidth: 95,
    maxWidth: 95,
    boxShadow: '0 1px 1px 1px grey',
    textTransform: 'inherit',
  },
  menuRow: {
    paddingBottom: 15,
  },
  userName: {
    fontStyle: 'italic',
    fontSize: '15px',
  },
  userDate: {
    position: 'absolute',
    fontSize: '15px',
  },
  paddingTop: {
    paddingTop: '15px',
  },
  padding: {
    padding: '0px 3  0px 0px 30px',
  },
  iconSize: {
    fontSize: 40,
  },
  notifIcon: {
    fontSize: 30,
  },
  logo1: {},
}));

export default useStyles;
