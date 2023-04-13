import Snackbar from '@material-ui/core/Snackbar';
import { inject, observer } from 'mobx-react';
import { FC } from 'react';
import { RootStoreInterface } from '../../store/AppStore';
import { AbstractEmptyInterface } from '../../types';
import Alert from '../Alert';
import useStyles from './style';

interface SnackbarProps extends AbstractEmptyInterface {
  rootStore: RootStoreInterface;
}

const CustomizedSnackbar: FC<AbstractEmptyInterface> = props => {
  const { rootStore } = props as SnackbarProps;
  const classes = useStyles();

  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    rootStore.updateSnackBar(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={rootStore.snackBarState.open}
        autoHideDuration={rootStore.snackBarState.duration}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity={rootStore.snackBarState.severity}>
          {rootStore.snackBarState.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default inject('rootStore')(observer(CustomizedSnackbar));
