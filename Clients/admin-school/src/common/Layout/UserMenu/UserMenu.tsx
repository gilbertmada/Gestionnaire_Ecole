import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { FC } from "react";
import { inject, observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import authServices from "../../../services/AuthServices";
import { IUser } from "../../interface/userInterface";
import useStyles from "./style";

interface UserMenuProps {
  anchorEl: any;
  handleClose: (e?: any) => void;
  currentUser: IUser | null;
}

const UserMenu: FC<
  { anchorEl: any } & { handleClose: (e?: any) => void } & {
    currentUser: IUser | null;
  }
> = (props: any) => {

  const { anchorEl, handleClose, currentUser } = props as UserMenuProps;

  const history = useHistory();

  const classes = useStyles();

  const handleLogout = () => {

    authServices.signOut();

    history.replace("/login");
  };


  const handleMyAccount = () => {
    history.push("/user/profile");
    handleClose();
  };


  const redirect = (e: string) => () => {
    history.push(e);
    handleClose();
  };

  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted={true}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      elevation={10}
      classes={{
        paper: classes.menu,
      }}
    >
      <MenuItem onClick={handleMyAccount}>Mon compte</MenuItem>
      <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
    </Menu>
  );
};

export default UserMenu;
