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
import { AbstractEmptyInterface } from "../../../../types";
import useStyles from "../style";
import { defaultDataPrive } from "../table.info";
import rootStore from '../../../../store/AppStore';
import { StudentStoreInterface } from "../../../../store/StudentStore";
import { toJS } from "mobx"
import Ecolage from "../Ecolage";

interface DefaultProps {
  dataPrive: IEcolagePrive;
  openEdit: boolean;
  handleClose: (e: any) => void;
}

interface Props extends AbstractEmptyInterface, DefaultProps {
  studentStore: StudentStoreInterface;
  userStore: UserStoreInterface;
}

const OptionsDialog: FC<AbstractEmptyInterface & DefaultProps> = (props) => {
  const { dataPrive, openEdit, handleClose, userStore, studentStore } =
    props as Props;
  const classes = useStyles();
  const [current, setCurrent] = useState<IEcolagePrive>(defaultDataPrive);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const [student, setStudent] = useState<any>({});
  const [isPrive, setIsPrive] = useState(false);


  useEffect(() => {
    if (dataPrive.student !== "") {
      setCurrent(dataPrive);
      setIsEdit(true);
    } else {
      setCurrent(defaultDataPrive);
      setIsEdit(false);
    }
  }, [dataPrive]);


  useEffect(() => {

    if (studentStore.selectedStudent?.schoolName.includes("Privé")) {
      setIsPrive(false);
      setStudent(studentStore.selectedStudent);
    } else {
      setIsPrive(true);
    }

  }, [studentStore.selectedStudent]);

  // useEffect(() => {
  //   setCurrent(defaultDataPrive);

  // }, [defaultDataPrive]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    const newValue = {
      ...current, [name]: value

    }
    setCurrent({ ...newValue });

  };


  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (current.student.trim().toLocaleLowerCase()  !== studentStore.selectedStudent?.lastName.trim().toLocaleLowerCase()  || current.matriculNumber !== studentStore.selectedStudent?.matriculNumber) {

      rootStore.updateSnackBar(true, 'Prénom ou Numéro matricule incorrect !');
    } else if (!isEdit) {
     
      studentStore.setEcolagePrive({
        ...current,
        id: studentStore.ecolagePrive.length ?
          studentStore.ecolagePrive[studentStore.ecolagePrive.length - 1].id + 1
          : 1,
      });
      studentStore.createEcolagePrive({...current})

    }
    else {
      studentStore.setEcolagePrive({
        ...current
      });
    }

    handleClose(e);
  };

  return (
    <Dialog open={openEdit} onClose={handleClose} maxWidth="xs">
      <form onSubmit={handleSubmit} className={classes.ecolageForm}>
        <DialogTitle
          className={classes.bgColorWhite}
          id="alert-dialog-title"
          color="primary"
        >
          ECOLAGE
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
            name="datePayEcolage"
            type="date"
            value={current?.datePayEcolage || moment().format("YYYY/MM/DD")}
            onChange={handleChange}
            required={true}
            fullWidth={true}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Mois"
            name="ecolageMonth"
            value={current.ecolageMonth || ""}
            onChange={handleChange}
            required={true}
            fullWidth={true}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Ecolage"
            name="ecolage"
            value={current?.ecolage || ""}
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
