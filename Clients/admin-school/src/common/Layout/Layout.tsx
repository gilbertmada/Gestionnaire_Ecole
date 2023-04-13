import { Badge, Grid, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CalendarToday from "@material-ui/icons/CalendarToday";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { inject, observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";
import logo from "../../Assets/images/logo.png";
import config from "../../config";
import { RootStoreInterface } from "../../store/AppStore";
import { UserStoreInterface } from "../../store/UserStore";
import { AbstractEmptyInterface } from "../../types";
import Menu from "./Menu";
import MenuListItem from "./MenuListItem";
import useStyles from "./style";
import UserMenu from "./UserMenu";

const ENDPOINT = `${config.servers.apiUrlSocket}`;

const socket = socketIOClient(ENDPOINT);

const StyledBadge = withStyles({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid white`,
    padding: "0 4px",
  },
})(Badge);

interface LayoutProps extends AbstractEmptyInterface {
  userStore: UserStoreInterface;
  rootStore: RootStoreInterface;
  children: any;
}

const Layout: FC<AbstractEmptyInterface> = (props) => {
  const { userStore, children, rootStore } = props as LayoutProps;
  const classes = useStyles();
  const [toggleState, setToggleState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const history = useHistory();

  const date = new Date();
  const getMonth = date.getMonth() + 1;
  const month = getMonth.toString().length === 1 ? `0${getMonth}` : getMonth;
  const formatDate = `${date.getDate()}/${month}/${date
    .getFullYear()
    .toString()
    .substring(2)}`;

  const toggleDrawer = () => {
    setToggleState(!toggleState);
  };

  const handleOpenUserMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Grid
        container={true}
        direction="row"
        justify="space-between"
        className={classes.menu}
      >
        <Grid item={true}>
          <IconButton color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon className={classes.iconSize} />
          </IconButton>

        </Grid>
        <Grid item={true} className={classes.paddingTop}>
          <div className={classes.logo1} onClick={handleOpenUserMenu}>
            <img src={logo} alt="SCHOOL" className={classes.logo} />
            <UserMenu
              anchorEl={anchorEl}
              handleClose={handleCloseUserMenu}
              currentUser={userStore.user}
            />
          </div>
        </Grid>

        <Grid item={true} className={classes.hidden}>
          <UserMenu
            anchorEl={anchorEl}
            handleClose={handleCloseUserMenu}
            currentUser={userStore.user}
          />
        </Grid>

      </Grid>



      <Menu open={toggleState} setClose={setToggleState}>
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer}
        >
          <MenuListItem />
        </div>
      </Menu> 

      <div className={classes.container}>{children}</div>
    </div>
  );
};

export default inject("userStore", "rootStore")(observer(Layout));
