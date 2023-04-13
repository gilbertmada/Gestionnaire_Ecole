import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  white: {
    color: '#fff',
  },
  menuItem: {
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#0ab1e1',
      color: '#fff',
    },
  },
}));

export default useStyles;
