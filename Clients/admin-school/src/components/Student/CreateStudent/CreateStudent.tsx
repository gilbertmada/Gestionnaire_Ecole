import {
  Grid,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import ListIcon from "@material-ui/icons/ListAlt";
import SaveListIcon from "@material-ui/icons/Save";
import { inject, observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import AvatarUploader from "react-avatar-uploader";
import { useHistory } from "react-router-dom";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import photo from "../../../Assets/images/person.png";
import BodyTitle from "../../../common/BodyTitle";
import EditFooter from "../../../common/EditFooter";
import HeaderPath from "../../../common/HeaderPath";
import { FooterIcon } from "../../../common/interface";
import { ConfirmModal, ConfirmQuitModal, DeleteTotalModal } from "../../../common/Modal";
import config from "../../../config/index";
import { StudentStoreInterface } from "../../../store/StudentStore";
import { AbstractEmptyInterface } from "../../../types";
import exportPDFStore from "../../../store/ExportPDFStore";
import { toJS } from "mobx";
import rootStore from '../../../store/AppStore';
import useStyles from "./style";

interface CreateStudentProps extends AbstractEmptyInterface {
  studentStore: StudentStoreInterface;

}

const nameImage = "image";
const CreateStudent: FC<CreateStudentProps> = (props: any) => {

  const { studentStore } = props as CreateStudentProps;
  const classes = useStyles();
  const history = useHistory();
  const [isStorage, setIsStorage] = useState(false);
  const [student, setStudent] = useState<any>({});
  const [openModal, setOpenModal] = useState(false);
  const [openQuitModal, setOpenQuitModal] = useState(false);
  const [openTotalDeleteModal, setOpenTotalDeleteModal] = useState(false);
  const [pathRedirect, setPathRedirect] = useState("");

  useEffect(() => {

    if (studentStore.selectedStudent) {
      setIsStorage(true);
      setStudent(studentStore.selectedStudent);
    } else {
      setIsStorage(false);
    }

  }, [studentStore.selectedStudent]);

  useEffect(() => {
    studentStore.getAllStudent();

  }, [studentStore]);

  useEffect(() => {
    if (studentStore.selectedStudent) {
      studentStore.getListEcolage();
      studentStore.getListFraisDivers();
    }

  }, [studentStore]);

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!studentStore.selectedStudent) {

      props.studentStore.createStudent(student).then((addUser: any) => {
        if (addUser) {
          history.push("/student/list");
          studentStore.getAllStudent();
        }
      });
    }
    else {
      props.studentStore.updateStudent(student).then((editStudent: any) => {

        if (editStudent?.status === 200) {

          history.push("/student/list");
          studentStore.getAllStudent();
        }
        if (editStudent?.status === 200) {

          history.push("/student/list");

        }
      });
    }

  };

  const handleOpenConfirmModal = (path: string) => (e: any) => {
    e.preventDefault();

    setPathRedirect(path);

    if (!isStorage) {
      setOpenQuitModal(true);
    } else {
      setOpenModal(true)
    }

    // setOpenModal(true);

  }
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });

  };

  const getPHotoProfilePath = (error: any, response: any) => {
    setStudent({ ...student, photo: response.data.path.replace("fichier", "/uploadFile/file") });
  };

  const handleCloseConfirmModal = () => {
    setOpenModal(false);
  };

  const handleCloseConfirmQuitModal = () => {
    setOpenQuitModal(false);
  };

  const handleOpenDeleteTotalModal = () => {

    setOpenTotalDeleteModal(true);
  };


  const handleCloseDeleteTotalModal = () => {
    setOpenTotalDeleteModal(false);
  };

  const handleAddNew = () => {
    history.push("/student/ecolage");
  };



  const handleDownload = () => {
    const selectStudent = studentStore.selectedStudent;
    if (!studentStore.selectedStudent) {
      exportPDFStore.exportToPdfRecuDroit(student);
    } else {
      exportPDFStore.exportToPdfRecuDroit(selectStudent);
    }

  }

  const listEcolages = toJS(studentStore.ecolagePrive);
  const listFrais = toJS(studentStore.droit);
  const selectListEcolage: any = [];
  const selectListFrais: any = [];

  for (let i = 0; i < listEcolages.length; i++) {
    if (listEcolages[i].student === studentStore.selectedStudent?.lastName && listEcolages[i].matriculNumber === studentStore.selectedStudent?.matriculNumber) {
      selectListEcolage.push(listEcolages[i]);

    }
  }

  for (let i = 0; i < listFrais.length; i++) {
    if (listFrais[i].student === studentStore.selectedStudent?.lastName && listFrais[i].matriculNumber === studentStore.selectedStudent?.matriculNumber) {
      selectListFrais.push(listFrais[i])
    }
  }

  const deleteTotalUser = () => {

    if (selectListEcolage.length > 0 || selectListFrais.length > 0) {

      rootStore.updateSnackBar(true, "Vous devez supprimer toute liste d'écolage ou de frais divers");
    } else {
      props.studentStore
        .deleteTotalStudent(studentStore.selectedStudent)
        .then((editUser: any) => {
          if (editUser?.status === 200) {
            setOpenTotalDeleteModal(false);
            history.push("/student/list");
          }
        });
    }

  }

  const footerIcons: FooterIcon[] = [
    {
      id: 0,
      ItemIcon: SaveListIcon,
      label: "Ajouter",
      type: "submit",
      title: "Sauvegarder",
    },
    {
      id: 1,
      ItemIcon: ListIcon,
      label: "Liste",
      onClick: handleOpenConfirmModal("/student/list"),
      title: "Liste",
    },
    {
      id: 2,
      ItemIcon: DeleteIcon,
      label: "Supprimer",
      onClick: handleOpenDeleteTotalModal,
      title: "Supprimer"
    },
    {
      id: 4,
      ItemIcon: AddIcon,
      label: "Nouveau",
      onClick: handleAddNew,
      title: `${studentStore.selectedStudent?.schoolName.includes("Privé") ? "Ecolage" : "Frais divers"
        }`,
    },
    {
      id: 5,
      ItemIcon: PictureAsPdfIcon,
      onClick: handleDownload,
      title: "Exporter en PDF",
    },


  ];


  return (
    <div className={classes.root}>
      <div>
        <ConfirmModal
          isOpen={openModal}
          handleCloseConfirmModal={handleCloseConfirmModal}
          path={pathRedirect}
        />
        <ConfirmQuitModal
          isOpen={openQuitModal}
          handleCloseConfirmQuitModal={handleCloseConfirmQuitModal}
          path={pathRedirect}
        />

        <DeleteTotalModal
          isOpen={openTotalDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteTotalModal}
          deleteData={deleteTotalUser}
        />
      </div>

      <HeaderPath
        paths={[
          {
            label: "Dashboard",
            path: "/",
            clickHandler: handleOpenConfirmModal,
          },
          {
            label: "Elèves",
            path: "/student/list",
            clickHandler: handleOpenConfirmModal,
          },
          {
            label: `${!isStorage ? "Création élève" : "Fiche élève"
              }`,
            path: "/student/new-student",
          },
        ]}
      />

      <form onSubmit={onSubmit}>

        <div className={classes.content}>
          <BodyTitle title="Elève" />
          <div className={classes.fields}>
            <div className={classes.firstSection}>
              <Grid container={true}>
                <Grid
                  item={true}
                  xs={12}
                  md={4}
                  spacing={5}
                  className={classes.AvatarUploadStyle}
                >
                  <AvatarUploader
                    defaultImg={
                      `${config.servers.apiUrl}${student.photo?.replace(
                        "/uploadFile",
                        "uploadFile"
                      )}` ||
                      photo ||
                      " "
                    }
                    size={200}
                    name="file"
                    uploadURL={`${config.servers.apiUrl}uploadFile/upload/profiles`}
                    onFinished={getPHotoProfilePath}
                    fileType={nameImage}
                  />
                </Grid>

                <Grid
                  container={true}
                  direction="row"
                  spacing={2}
                  xs={12}
                  md={8}
                >
                  <Grid item={true} md={8}>
                    <TextField
                      label="Ecole"
                      required={true}
                      name="schoolName"
                      fullWidth={true}
                      value={student.schoolName || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item={true} md={6}>
                    <TextField
                      label="Nom"
                      required={true}
                      name="firstName"
                      fullWidth={true}
                      value={student.firstName || ""}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item={true} xs={12} md={6}>
                    <TextField
                      label="Prénom"
                      name="lastName"
                      fullWidth={true}
                      value={student.lastName || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item={true} xs={12} md={6} >
                    <TextField
                      label="Numéro matricule"
                      name="matriculNumber"
                      value={student.matriculNumber || ""}
                      required={true}
                      fullWidth={true}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item={true} xs={12} md={6}>
                    <TextField
                      label="Niveau"
                      name="height"
                      value={student.height || ""}
                      required={true}
                      fullWidth={true}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item={true} xs={12} md={4}>
                    <TextField
                      label="Nom de classe"
                      required={true}
                      name="class"
                      fullWidth={true}
                      value={student.class || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item={true} xs={12} md={4}>
                    <TextField
                      label="Adresse"
                      required={true}
                      name="address"
                      fullWidth={true}
                      value={student.address || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item={true} xs={12} md={4}>
                    <TextField
                      label="Droit d'inscription"
                      required={true}
                      name="inscriptionDroit"
                      fullWidth={true}
                      value={student?.inscriptionDroit || ""}
                      onChange={handleChange}
                    />
                  </Grid>

                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <EditFooter icons={footerIcons} />
      </form>
    </div>
  );
}
export default inject("studentStore")(observer(CreateStudent));

