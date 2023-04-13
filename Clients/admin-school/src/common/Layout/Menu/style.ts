import makeStyles from '@material-ui/core/styles/makeStyles';

const contentCommonStyle = {
  background: 'white',
  width: '30%',
  zIndex: 5,
  height: '100%',
  transition: '500ms',
};

const box = {
  background: 'transparent',
  width: '100%',
  zIndex: -5,
  height: '100%',
  cursor: 'pointer',
};

const useStyles = makeStyles({
  contentDisplay: {
    ...contentCommonStyle,
    top: 0,
    left: 0,
    position: 'fixed',
  },
  contentNoDisplay: {
    ...contentCommonStyle,
    top: 0,
    left: '-30%',
    position: 'fixed',
  },
  BoxDisplay: {
    ...box,
    position: 'fixed',
    display: 'block',
  },
  BoxNoDisplay: {
    ...box,
    position: 'fixed',
    display: 'none',
  },
});

export default useStyles;
