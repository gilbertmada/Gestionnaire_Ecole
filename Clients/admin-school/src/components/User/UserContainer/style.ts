import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  container: {
    padding: '20px',
    margin: '20px',
  },
  formGroup: {
    width: '100%',
    '& .MuiFormControl-root': {
      width: '100%',
    },
  },
  heading: {
    display: 'flex',
    '& h3': {
      width: '90%',
    },
  },
  btnColor: {
    background: '#0AB1E1',
    color: 'white',
    height: '28px',
    fontWeight: 0,
    '&:hover': {
      backgroundColor: '#107BDF',
    },
  },
});

export default useStyles;
