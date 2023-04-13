import {
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import ListIcon from "@material-ui/icons/ListAlt";
import SaveListIcon from "@material-ui/icons/Save";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { inject, observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import AvatarUploader from "react-avatar-uploader";
import { useHistory } from "react-router-dom";
import photo from "../../../Assets/images/person.png";
import BodyTitle from "../../../common/BodyTitle";
import EditFooter from "../../../common/EditFooter";
import FormSelect from "../../../common/FormSelect/FormSelect";
import HeaderPath from "../../../common/HeaderPath";
import { FooterIcon } from "../../../common/interface";
import { ConfirmModal, ConfirmQuitModal, DeleteTotalModal } from "../../../common/Modal";
import { profRoles } from "../../../common/utils/data";
import config from "../../../config/index";
import { ProfessorStoreInterface } from "../../../store/ProfessorStore";
import { AbstractEmptyInterface } from "../../../types";
import { toJS } from "mobx";
import rootStore from '../../../store/AppStore';
import useStyles from "./style";

interface CreateProfProps extends AbstractEmptyInterface {
  professorStore: ProfessorStoreInterface;

}

const nameImage = "image";

const CreateProfessor: FC<AbstractEmptyInterface> = (props: any) => {

  const { professorStore } = props as CreateProfProps;

  const classes = useStyles();
  const history = useHistory();
  const [isStorage, setIsStorage] = useState(false);
  const [professor, setProfessor] = useState<any>({});
  const [role, setRole] = useState<any>({});
  const [openModal, setOpenModal] = useState(false);
  const [openQuitModal, setOpenQuitModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isErrorText, setIsErrorText] = useState(false);
  const [isAssigned, setIsAssigned] = useState(false);
  const [pathRedirect, setPathRedirect] = useState("");



  useEffect(() => {

    if (professorStore.selectedProfessor) {
      setIsStorage(true);
      setRole(getRole(professorStore.selectedProfessor.role));
      setProfessor(professorStore.selectedProfessor);
    } else {
      setIsStorage(false);
    }
  }, [professorStore.selectedProfessor]);


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProfessor({ ...professor, [name]: value });
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleChangeRole = (newValue: any) => {
    const { code, label } = newValue;
    const data = code as string;
    const nom = label as string;

    setRole(newValue);
    setProfessor({ ...professor, role: data, nomRole: nom });

  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!professorStore.selectedProfessor) {
      if (professor.password !== professor.confirmPassword) {
        setIsErrorText(true);
        setErrorText("Ne correspond pas au mot de passe");
      } else {
        setIsErrorText(false);
        setErrorText("");
        props.professorStore.createProfessor(professor).then((addProf: any) => {
          if (addProf) {
            history.push("/professor/list");
            professorStore.getAllProfessor();
          }
        });
      }
    } else {
      props.professorStore.updateProfessor(professor).then((editProf: any) => {

        if (editProf?.status === 200 && professorStore.filters?.currentlyWorking === true) {

          history.push("/professor/list");
          professorStore.getAllProfessor();
        }

      });
    }
  };



  const handleOpenConfirmModal = (path: string) => (e: any) => {
    e.preventDefault();

    setPathRedirect(path);
    

    if (!isStorage ) {
      setOpenQuitModal(true);
    } else {
      setOpenModal(true)
    }

   
    // setOpenModal(true);
  };

  const handleCloseConfirmModal = () => {
    setOpenModal(false);
  };

  const handleCloseConfirmQuitModal = () => {
    setOpenQuitModal(false);
  };

  const handleOpenDeleteModal = () => {

    setOpenDeleteModal(true);
  };


  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };


  const deleteProfessor = () => {

    if (professorStore.setSelectedProfessor) {
      props.professorStore
        .deleteProfessor(professorStore.setSelectedProfessor)
        .then((editProf: any) => {
          if (editProf.status === 200) {
            setOpenDeleteModal(false);
            history.push("/professor/list");
          }
        });
    } else {
      setOpenDeleteModal(false);
    }
  };


  const footerIcons: FooterIcon[] = [
    {
      id: 0,
      ItemIcon: SaveListIcon,
      label: "Ajouter",
      type: "submit",
      title: professorStore.selectedProfessor ? "Sauvegarder" : "Créer",
    },
    {
      id: 1,
      ItemIcon: ListIcon,
      label: "Liste",
      onClick: handleOpenConfirmModal("/professor/list"),
      title: "Liste",
    },
    {
      id: 2,
      ItemIcon: DeleteIcon,
      label: "Supprimer",
      onClick: handleOpenDeleteModal,
      title: "Supprimer"
    },

  ];


  const getRole = (code: string) => {
    return profRoles.find((item: any) => item?.code === code);
  };

  const getPHotoProfilePath = (error: any, response: any) => {
    setProfessor({ ...professor, photo: response.data.path.replace("fichier", "/uploadFile/file") });
  };

  const getOptionLabel = (option: any) => option?.label;

  const onChangeAutoComplete = (e: any, newValue: string) => {
    handleChangeRole(newValue);

  };

  const renderInputAutoComplete = (params: any) => {
    return <TextField {...params} name="code" label="Rôle" required={true} />;
  };

  const PaperComponentAutoComplete: FC = ({ children }) => {
    return <Paper style={{ background: "white" }}>{children}</Paper>;
  };
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
          isOpen={openDeleteModal}
          handleCloseDeleteModal={handleCloseDeleteModal}
          deleteData={deleteProfessor}
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
            label: "Enseignant",
            path: "/professor/list",
            clickHandler: handleOpenConfirmModal,
          },
          {
            label: `${!isStorage ? "Création Enseignant" : "Fiche Enseignant"
              }`,
            path: "/Enseignant/new-Enseignant",
          },
        ]}
      />

      <form onSubmit={onSubmit}>
        <div className={classes.content}>
          <BodyTitle title="Enseignant" />
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
                      `${config.servers.apiUrl}${professor.photo?.replace(
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
                  <Grid item={true} xs={12} md={4}>
                    <Autocomplete
                      options={profRoles}
                      getOptionLabel={getOptionLabel}
                      value={role}
                      PaperComponent={PaperComponentAutoComplete}
                      onChange={onChangeAutoComplete}
                      renderInput={renderInputAutoComplete}
                    />
                  </Grid>
                  <Grid container={true} spacing={2}>
                    <Grid item={true} md={6}>
                      <TextField
                        label="Nom"
                        required={true}
                        name="lastName"
                        fullWidth={true}
                        value={professor.lastName || ""}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item={true} xs={12} md={6}>
                      <TextField
                        label="Prénom"
                        name="firstName"
                        fullWidth={true}
                        value={professor.firstName || ""}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid container={true} spacing={2}>
                    <Grid item={true} xs={12} md={4}>
                      <TextField
                        label="IM"
                        required={true}
                        name="IM"
                        fullWidth={true}
                        value={professor.IM || ""}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item={true} xs={12} md={4}>
                      <TextField
                        label="Matière"
                        required={true}
                        name="matiere"
                        fullWidth={true}
                        value={professor.matiere || ""}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item={true} xs={12} md={4}>
                      <TextField
                        label="E-mail"
                        name="email"
                        value={professor.email || ""}
                        required={true}
                        type="email"
                        fullWidth={true}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                  {isStorage === false ? (
                    <Grid container={true} spacing={2}>
                      <Grid item={true} xs={12} sm={6}>
                        <TextField
                          label="Mot de passe"
                          required={true}
                          name="password"
                          type={showPassword ? "text" : "password"}
                          fullWidth={true}
                          value={professor.password || ""}
                          onChange={handleChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                >
                                  {showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item={true} xs={12} sm={6}>
                        <TextField
                          error={isErrorText}
                          helperText={errorText === "" ? "" : errorText}
                          label="Confirmer mot de passe"
                          required={true}
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          fullWidth={true}
                          value={professor.confirmPassword || ""}
                          onChange={handleChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                >
                                  {showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                  ) : (
                    <div className={classes.diplayDiv}>.</div>
                  )}
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <EditFooter icons={footerIcons} />
      </form>
    </div>
  );
};

export default inject("professorStore")(observer(CreateProfessor));
