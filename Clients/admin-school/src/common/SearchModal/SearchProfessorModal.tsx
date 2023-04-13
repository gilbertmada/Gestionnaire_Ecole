import { Button, Dialog, Grid, IconButton } from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { DataGrid, GridRowModel } from '@material-ui/data-grid';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/styles';
import { inject, observer } from "mobx-react";
import axios from 'axios';
import { FC, useEffect, useLayoutEffect, useState } from 'react';
import config from '../../config';
import ListSearch from '../List/ListSearch';
import { IProfessor } from '../interface/classeInterface/professorClasse';
import useStyles from './style';
import { ProfessorStoreInterface } from "../../store/ProfessorStore";
import { AbstractEmptyInterface } from "../../types";
import { getProfessorColumns } from './table.info';


// interface DefaultProps {
//     openModal: boolean;
//     handleClose: (e: any) => void;
//   }

// interface ListProfessorProps extends AbstractEmptyInterface,DefaultProps {
//     professorStore: ProfessorStoreInterface;
//   }


const DialogContent = withStyles(() => ({
  root: {
    padding: '15px',
  },
}))(MuiDialogContent);

const SearchProfessorModal: FC<any> = ({ openModal, handleClose, setProfessor }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [enseignant, setEnseignant] = useState<IProfessor[] | []>([]);
  const [screenSize, setScreenSize] = useState(screen.width);
  // const [countDrivers, setCountDrivers] = useState(0);


  //   const { professorStore,openModal,handleClose } = props as ListProfessorProps;

  useLayoutEffect(() => {
    setScreenSize(window.innerWidth - 75);
    window.addEventListener('resize', () => setScreenSize(window.innerWidth - 75));
    return () => window.removeEventListener('resize', () => setScreenSize(window.innerWidth - 75));
  }, []);

  const columns = getProfessorColumns(classes, screenSize);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${config.servers.apiUrl}professor/`)
      .then(res => {
        setEnseignant(res.data);
        // setCountDrivers(res.data.count);
      })
      .finally(() => {
        setIsLoading(false);
      });

  }, []);


  const getFiltereProfessor = async (keyword: string) => {
    if (keyword !== '') {

      setIsLoading(true);
      const filtre = await axios
        .post(`${config.servers.apiUrl}professor/filter`, { keyword })
        .then(res => {
          setEnseignant(res.data);
        })
        .finally(() => {
          setIsLoading(false);
        });

    } else {
      setIsLoading(true);
      const profss = await axios
        .get(`${config.servers.apiUrl}professor/`)
        .then(res => {
          setEnseignant(res.data);
        })
        .finally(() => {
          setIsLoading(false);
        });


    }
  };

  const selectEnseignant = (professor: GridRowModel) => {
    setProfessor(professor);
    handleClose();
  };



  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={openModal}
      classes={{ paper: classes.paper }}
      fullWidth={true}>
      <MuiDialogTitle
        disableTypography={true}
        id="customized-dialog-title"
        className={classes.border}>
        <Grid container={true} spacing={2} alignItems="center" justify="space-between">
          <Grid item={true}>Rechercher</Grid>
          <Grid item={true}>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon className={classes.closeButton} />
            </IconButton>
          </Grid>
        </Grid>
      </MuiDialogTitle>
      <DialogContent>
        <div>

          <div>
            <ListSearch search={getFiltereProfessor} withCreate={false} />
          </div>
          <div className={classes.tableStyle}>
            <DataGrid
              rows={enseignant}
              columns={columns}
              pageSize={10}
              loading={isLoading}
              sortingOrder={['desc', 'asc']}
              disableColumnMenu={true}
              onRowClick={(res: any) => selectEnseignant(res.row)}
              hideFooterSelectedRowCount={true}
              // rowCount={countDrivers}
              //   onPageChange={handlePageChange}
              paginationMode="server"
            />
          </div>
          <Button
            size="small"
            className={classes.close}
            classes={{ label: classes.btnSearchLabel }}
            onClick={handleClose}>
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchProfessorModal;
// export default inject("professorStore")(observer(SearchProfessorModal));
