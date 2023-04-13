import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
  white: {
    color: '#fff',
  },
  footer: {
    background: '#2196f3',
    padding: '10px 0px 10px 0px',
    marginTop: '15px',
    minWidth: '100vw',
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 0,
  },
}));

export default useStyles;
