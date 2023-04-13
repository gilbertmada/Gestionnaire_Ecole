import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  confirmModal: {
    background: 'white',
    overflowX: 'hidden',
  },
  confirmBtn: {
    background: '#0AB1E1',
    color: 'white',
    height: '28px',
    fontWeight: 0,
    '&:hover': {
      backgroundColor: '#0AB1E1',
    },
  },
  textCenter: {
    textAlign: 'center',
  },
  IconColor: {
    color: '#0AB1E1',
  },
});

export default useStyles;
