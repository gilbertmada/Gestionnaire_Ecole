import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { inject, observer } from "mobx-react";
import { FC, useState } from "react";
import AvatarUploader from "react-avatar-uploader";
import photo from "../../../Assets/images/person.png";
import config from "../../../config/index";
import { IUser } from "../../../common/interface/userInterface";
import useStyles from "./style";

export interface UserValidationError {
  firstName?: string;
  email?: string;
  username?: string;
  newPassword?: string;
  confirmPassword?: string;
  password?: string;
}
interface UserProps {
  user: IUser | null;
  handleSave: (user: IUser) => void;
  validationError: UserValidationError;
}

const User: FC<UserProps> = ({ user, handleSave, validationError }) => {
  const nameImage = "image";
  const classes = useStyles();
  const [userEdit, setUserEdit] = useState<
    (IUser & { newPassword?: string; confirmPassword?: string }) | null
  >(user ? { ...user, password: "" } : null);

  const [changedEmail, setChangedEmail] = useState(false);

  const handleChange = (e: any) => {
    if (userEdit) {
      setUserEdit({ ...userEdit, [e.target.name as any]: e.target.value });
      if (e.target.name === "email") {
        setChangedEmail(e.target.value !== user?.email);
      }
    }
  };

  const handleValidate = () => {
    if (userEdit) {
      handleSave(userEdit);
    }
  };

  const getPHotoProfilePath = (error: any, response: any) => {
    if (userEdit)
      setUserEdit({ ...userEdit, photo: response?.data.path.replace("fichier","/uploadFile/file") } as any);
  };

  return (
    <form className={classes.container} autoComplete="off">
      <div className={classes.heading}>
        <h3>Mon compte</h3>
        <Button
          variant="contained"
          className={classes.btnColor}
          onClick={handleValidate}
        >
          Enregistrer
        </Button>
      </div>
      <div>
        <div>
          <AvatarUploader
            defaultImg={
              `${config.servers.apiUrl}${user?.photo?.replace(
                "/uploadFile",
                "uploadFile"
              )}` || photo
            }
            size={200}
            name="file"
            uploadURL={`${config.servers.apiUrl}uploadFile/upload/profiles`}
            onFinished={getPHotoProfilePath}
            fileType={nameImage}
          />
        </div>
        <div className={classes.formGroup}>
          <TextField
            id="user-firstName"
            label="Nom"
            name="firstName"
            value={userEdit?.firstName || ""}
            onChange={handleChange}
            error={Boolean(validationError.firstName)}
            helperText={validationError.firstName}
          />
        </div>
        <div className={classes.formGroup}>
          <TextField
            id="user-lastName"
            label="Prénom"
            name="lastName"
            value={userEdit?.lastName || ""}
            onChange={handleChange}
          />
        </div>
        <div className={classes.formGroup}>
          <TextField
            id="user-email"
            label="E-mail"
            type="email"
            name="email"
            value={userEdit?.email || ""}
            onChange={handleChange}
            error={Boolean(validationError.email)}
            helperText={validationError.email}
          />
        </div>
        <div className={classes.formGroup}>
          <TextField
            id="user-login"
            label="Login"
            name="username"
            value={userEdit?.username || ""}
            onChange={handleChange}
            error={Boolean(validationError.username)}
            helperText={validationError.username}
          />
        </div>
        <div className={classes.formGroup}>
          <TextField
            id="user-password"
            label="Nouveau mot de passe"
            type="password"
            name="newPassword"
            value={userEdit?.newPassword || ""}
            onChange={handleChange}
            error={Boolean(validationError.newPassword)}
            helperText={validationError.newPassword}
          />
        </div>
        {userEdit?.newPassword && (
          <div className={classes.formGroup}>
            <TextField
              id="user-password"
              label="Confirmation nouveau mot de passe"
              type="password"
              name="confirmPassword"
              value={userEdit?.confirmPassword || ""}
              onChange={handleChange}
              error={Boolean(validationError.confirmPassword)}
              helperText={validationError.confirmPassword}
            />
          </div>
        )}
        {(userEdit?.newPassword || changedEmail) && (
          <div className={classes.formGroup}>
            <TextField
              id="user-password"
              label="Mot de passe actuel"
              type="password"
              name="password"
              value={userEdit?.password || ""}
              onChange={handleChange}
              error={Boolean(validationError.password)}
              helperText={validationError.password}
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default inject("userStore")(observer(User));
