import {
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Grid,
  TextField,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { inject, observer } from "mobx-react";
import moment from "moment";
import { months } from "../../../../common/utils/data";
import { ChangeEvent, FC, useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { IEcolagePrive, IFraisDivers, IStudent } from '../../../../common/interface/StudentInterface';
import { UserStoreInterface } from "../../../../store/UserStore";
import rootStore from '../../../../store/AppStore';
import { defaultDataDivers } from "../table.info";
import { AbstractEmptyInterface } from "../../../../types";
import useStyles from "../style";
// import { defaultDataPrive } from "./table.info";
import { StudentStoreInterface } from "../../../../store/StudentStore";
import { toJS } from "mobx"
// import { defaultDataDivers } from "./table.info";

interface DefaultProps {
  dataDivers: IFraisDivers;
  openEdit: boolean;
  handleClose: (e: any) => void;
}

interface Props extends AbstractEmptyInterface, DefaultProps {
  studentStore: StudentStoreInterface;
  userStore: UserStoreInterface;
}

const OptionsDialog: FC<AbstractEmptyInterface & DefaultProps> = (props) => {
  const { dataDivers, openEdit, handleClose, userStore, studentStore } =
    props as Props;
  const classes = useStyles();
  const [current, setCurrent] = useState<IFraisDivers>(defaultDataDivers);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const [isPrive, setIsPrive] = useState(false);

  useEffect(() => {

    if (studentStore.selectedStudent?.schoolName.includes("Privé")) {
      setIsPrive(true);
    } else {
      setIsPrive(false);
    }

  }, [studentStore.selectedStudent]);

  useEffect(() => {
    if (dataDivers.student !== "") {
      setCurrent(dataDivers);
      setIsEdit(true);
    } else {
      setCurrent(defaultDataDivers);
      setIsEdit(false);
    }
  }, [dataDivers]);

  // useEffect(() => {
  //   setCurrent(defaultDataDivers);

  // }, [defaultDataDivers]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    const newValue = {
      ...current, [name]: value

    }
    setCurrent({ ...newValue });


  };



  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (current.student !== studentStore.selectedStudent?.lastName || current.matriculNumber !== studentStore.selectedStudent?.matriculNumber) {

      rootStore.updateSnackBar(true, 'Prénom Numéro matricule incorrect !');
    }
    else if (!isEdit) {

      studentStore.setDroit({
        ...current,
        id: studentStore.droit.length ?
          studentStore.droit[studentStore.droit.length - 1].id + 1
          : 1,
      });
      studentStore.createFraisDivers({...current})
    }
    else {
      studentStore.setDroit({
        ...current
      });
    }

    handleClose(e);
  };

  return (
    <Dialog open={openEdit} onClose={handleClose} maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <DialogTitle
          className={classes.bgColorWhite}
          id="alert-dialog-title"
          color="primary"
        >
          FRAIS DIVERS
        </DialogTitle>

        <DialogContent className={classes.bgColorWhite}>
          <TextField
            label="Prénom d'élève"
            name="student"
            value={current.student}
            onChange={handleChange}
            required={true}
            fullWidth={true}
            InputLabelProps={{ shrink: true }}
          />
            <TextField
            label="Numéro matricule"
            name="matriculNumber"
            value={current.matriculNumber}
            onChange={handleChange}
            required={true}
            fullWidth={true}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Date de payement"
            name="datePayDivers"
            type="date"
            value={current?.datePayDivers  || moment().format("YYYY/MM/DD")}
            onChange={handleChange}
            required={true}
            fullWidth={true}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Frais divers"
            name="frais"
            value={current?.frais || ""}
            onChange={handleChange}
            required={true}
            fullWidth={true}
          />

        </DialogContent>

        <DialogActions className={classes.bgColorWhite}>
          <Button type="button" onClick={handleClose} color="secondary">
            Annuler
          </Button>
          <Button type="submit" color="primary" autoFocus={true}>
            Continuer
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default inject("studentStore", "userStore")(observer(OptionsDialog));
