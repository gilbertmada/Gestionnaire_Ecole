import { GridColDef } from "@material-ui/data-grid";
import { inject, observer } from "mobx-react";
import { FC, useEffect, useLayoutEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import photo from "../../../Assets/images/person.png";
import ListComponent from "../../../common/List";
import { usersRoles } from "../../../common/utils/data";
// import UserFilter from './Filter';
import config from "../../../config/index";
import { UserStoreInterface } from "../../../store/UserStore";
import { AbstractEmptyInterface } from "../../../types";
import useStyles from "./style";

interface ListUserProps extends AbstractEmptyInterface {
  userStore: UserStoreInterface;
}

const ListUser: FC<AbstractEmptyInterface> = (props: any) => {
  const classes = useStyles();
  const history = useHistory();
  const [screenSize, setScreenSize] = useState(1024);

  const { userStore } = props as ListUserProps;

  useLayoutEffect(() => {
    setScreenSize(window.innerWidth - 75);
    window.addEventListener("resize", () =>
      setScreenSize(window.innerWidth - 75)
    );
    return () =>
      window.removeEventListener("resize", () =>
        setScreenSize(window.innerWidth - 75)
      );
  }, []);

  const columns: GridColDef[] = [
    {
      field: "photo",
      headerName: "Photos",
      width: Math.floor(screenSize / 10),
      headerClassName: classes.tableHeader,
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <img
            src={
              row.photo
                ? `${config.servers.apiUrl}${row.photo?.replace(
                    "/uploadFile",
                    "uploadFile"
                  )}`
                : photo
            }
            alt="profilephoto"
            width="50px"
            height="50px"
          />
        );
      },
    },
    {
      field: "lastName",
      headerName: "Nom",
      width: Math.floor(screenSize / 7),
      headerClassName: classes.tableHeader,
    },
    {
      field: "firstName",
      headerName: "Prénom",
      width: Math.floor(screenSize / 5),
      headerClassName: classes.tableHeader,
    },
    {
      field: "username",
      headerName: "Nom d'utilisateur",
      width: Math.floor(screenSize / 5),
      headerClassName: classes.tableHeader,
    },
    {
      field: "email",
      headerName: "E-mail",
      width: Math.floor(screenSize / 5),
      headerClassName: classes.tableHeader,
    },
    {
      field: "role",
      headerName: "Rôle",
      width: Math.floor(screenSize / 5),
      headerClassName: classes.tableHeader,
      valueFormatter: (params) =>
        usersRoles.find((role) => role.code === params.row.role)?.label,
        
        
    },
  ];
 
   
  useEffect(() => {
   
      userStore.getAllUser();
   
  }, [userStore]);

  const searchFilter = (searchField: any) => {
    if (searchField !== "" ) {
      userStore.getFilteredUser({ filter: searchField });
      
    }
    else {
      userStore.getAllUser();
    }
  };

  const createNew = () => {
    userStore.setSelectedUser(null);
    userStore.resetUser();
    userStore.allUsers = [];
    history.push("/user/new-user");
  };

  const onRowSelected = (dataSelected: any) => {
    userStore.setSelectedUser(dataSelected);
    userStore.allUsers = [];
    history.push("/user/new-user");
  };

  const currentPaths = [
    { label: "Dashboard", path: "/" },
    { label: "Utilisateurs", path: "/user/list" },
    { label: "Liste des utilisateurs", path: "/user/list" },
  ];


  return (
    <ListComponent
      columns={columns}
      rows={userStore.allUsers}
      paths={currentPaths}
      clickSearchData={searchFilter}
      loading={userStore.isLoading}
      onRowClick={onRowSelected}
      createNewData={createNew}
    //   FilerComponent={UserFilter}
      withCreate={true}

    />
  );
};

export default inject("userStore")(observer(ListUser));
