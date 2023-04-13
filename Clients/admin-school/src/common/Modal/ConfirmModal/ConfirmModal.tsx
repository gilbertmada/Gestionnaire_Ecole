import { Button, Dialog, Grid } from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from './style';

const DialogContent = withStyles(() => ({
  root: {
    padding: '15px',
  },
}))(MuiDialogContent);

const ConfirmModal: FC<{ isOpen: boolean; handleCloseConfirmModal: any; path: string }> = ({
  isOpen,
  handleCloseConfirmModal,
  path,
}) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Dialog
        onClose={handleCloseConfirmModal}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        classes={{ paper: classes.confirmModal }}>
        <DialogContent>
          <Grid container={true} direction="column" className={classes.textCenter}>
            <Grid item={true}>
              <AddAlertIcon fontSize="large" className={classes.IconColor} />
            </Grid>
            <Grid item={true}>
              <p>Il existe des modifications non sauvegardées?</p>
            </Grid>
            <Grid item={true}>
              <p>Voulez-vous vraiment quitter ?</p>
            </Grid>
            <Grid item={true}>
              <Grid container={true} direction="row" justify="center">
                <Grid item={true}>
                  <Button
                    size="small"
                    classes={{ label: classes.confirmBtn }}
                    onClick={() => history.push(path)}>
                    Oui
                  </Button>
                </Grid>
                <Grid item={true}>
                  <Button
                    size="small"
                    classes={{ label: classes.confirmBtn }}
                    onClick={handleCloseConfirmModal}>
                    Non
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmModal;
