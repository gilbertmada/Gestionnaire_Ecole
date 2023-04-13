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
import { ConfirmModal,ConfirmQuitModal, DeleteTotalModal } from "../../../common/Modal";
import { usersRoles } from "../../../common/utils/data";
import config from "../../../config/index";
import { UserStoreInterface } from "../../../store/UserStore";
import { AbstractEmptyInterface } from "../../../types";
import { toJS } from "mobx";
import rootStore from '../../../store/AppStore';
import useStyles from "./style";

interface CreateUserProps extends AbstractEmptyInterface {
  userStore: UserStoreInterface;

}

const defaultUser = {
  _id: "",
  lastName: "",
  firstName: "",
  email: "",
  username: "",
  role: "",
  password: "",
  photo: "",
  isArchive: false,
};
const nameImage = "image";

const CreateUser: FC<AbstractEmptyInterface> = (props: any) => {

  const { userStore } = props as CreateUserProps;

  const classes = useStyles();
  const history = useHistory();
  const [isStorage, setIsStorage] = useState(false);
  const [user, setUser] = useState<any>({});
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

    if (userStore.selectedUser) {
      setIsStorage(true);
      setRole(getRole(userStore.selectedUser.role));
      setUser(userStore.selectedUser);
    } else {
      setIsStorage(false);
    }
  }, [userStore.selectedUser]);


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleChangeRole = (newValue: any) => {
    const { code, label } = newValue;
    const data = code as string;
    const nom = label as string;

    setRole(newValue);
    setUser({ ...user, role: data, nomRole: nom });

  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!userStore.selectedUser) {
      if (user.password !== user.confirmPassword) {
        setIsErrorText(true);
        setErrorText("Ne correspond pas au mot de passe");
      } else {
        setIsErrorText(false);
        setErrorText("");
        props.userStore.createUser(user).then((addUser: any) => {
          if (addUser) {
            history.push("/user/list");
            userStore.getAllUser();
          }
        });
      }
    } else {
      props.userStore.updateUser(user).then((editUser: any) => {

        if (editUser?.status === 200 && userStore.filters?.currentlyWorking === true) {

          history.push("/user/list");
          userStore.getAllUser();
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


  const deleteUser = () => {

    if (userStore.selectedUser) {
      props.userStore
        .deleteUser(userStore.selectedUser)
        .then((editUser: any) => {
          if (editUser.status === 200) {
            setOpenDeleteModal(false);
            history.push("/user/list");
          }
        });
    } else {
      setOpenDeleteModal(false);
    }
  };

  const handleAddNew = () => {
    history.push("/user/new-user");
  };

  const footerIcons: FooterIcon[] = [
    {
      id: 0,
      ItemIcon: SaveListIcon,
      label: "Ajouter",
      type: "submit",
      title: userStore.selectedUser ? "Sauvegarder  " : "Créer",
    },
    {
      id: 1,
      ItemIcon: ListIcon,
      label: "Liste",
      onClick: handleOpenConfirmModal("/user/list"),
      title: "Liste",
    },
    {
      id: 2,
      ItemIcon: DeleteIcon,
      label: "Supprimer",
      onClick: handleOpenDeleteModal,
      title: "Supprimer"
    },
    // {
    //   id: 4,
    //   ItemIcon: AddIcon,
    //   label: "Nouveau",
    //   onClick: handleAddNew,
    //   title: "Créer",
    // },

  ];


  const getRole = (code: string) => {
    return usersRoles.find((item: any) => item?.code === code);
  };

  const getPHotoProfilePath = (error: any, response: any) => {
    setUser({ ...user, photo: response.data.path.replace("fichier", "/uploadFile/file") });
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
          deleteData={deleteUser}
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
            label: "Utilisateurs",
            path: "/user/list",
            clickHandler: handleOpenConfirmModal,
          },
          {
            label: `${!isStorage ? "Création utilisateur" : "Fiche utilisateur"
              }`,
            path: "/student/new-student",
          },
        ]}
      />

      <form onSubmit={onSubmit}>
        <div className={classes.content}>
          <BodyTitle title="Utilisateur" />
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
                      `${config.servers.apiUrl}${user.photo?.replace(
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
                      options={usersRoles}
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
                        value={user.lastName || ""}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item={true} xs={12} md={6}>
                      <TextField
                        label="Prénom"
                        name="firstName"
                        fullWidth={true}
                        value={user.firstName || ""}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid container={true} spacing={2}>
                    <Grid item={true} xs={12} md={6}>
                      <TextField
                        label="Nom d'utilisateur"
                        required={true}
                        name="username"
                        fullWidth={true}
                        value={user.username || ""}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item={true} xs={12} md={6}>
                      <TextField
                        label="E-mail"
                        name="email"
                        value={user.email || ""}
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
                          value={user.password || ""}
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
                          value={user.confirmPassword || ""}
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

export default inject("userStore")(observer(CreateUser));
