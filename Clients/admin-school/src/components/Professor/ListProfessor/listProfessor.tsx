import { GridColDef } from "@material-ui/data-grid";
import { inject, observer } from "mobx-react";
import { FC, useEffect, useLayoutEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import photo from "../../../Assets/images/person.png";
import ListComponent from "../../../common/List";
import { profRoles } from "../../../common/utils/data";
// import UserFilter from './Filter';
import config from "../../../config/index";
import { ProfessorStoreInterface } from "../../../store/ProfessorStore";
import { AbstractEmptyInterface } from "../../../types";
import useStyles from "./style";

interface ListProfessorProps extends AbstractEmptyInterface {
  professorStore: ProfessorStoreInterface;
}

const ListProfessor: FC<AbstractEmptyInterface> = (props: any) => {
  
  const classes = useStyles();
  const history = useHistory();
  const [screenSize, setScreenSize] = useState(1024);

  const { professorStore } = props as ListProfessorProps;

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
      field: "firstName",
      headerName: "Nom",
      width: Math.floor(screenSize / 7),
      headerClassName: classes.tableHeader,
    },
    {
      field: "lastName",
      headerName: "Prénom",
      width: Math.floor(screenSize / 7),
      headerClassName: classes.tableHeader,
    },
    {
      field: "role",
      headerName: "Rôle",
      width: Math.floor(screenSize / 7),
      headerClassName: classes.tableHeader,
      valueFormatter: (params) =>
        profRoles.find((role) => role.code === params.row.role)?.label,
        
        
    },
    {
      field: "IM",
      headerName: "IM",
      width: Math.floor(screenSize / 7),
      headerClassName: classes.tableHeader,
    },
    {
      field: "matiere",
      headerName: "Matière",
      width: Math.floor(screenSize / 5),
      headerClassName: classes.tableHeader,
    },
    {
      field: "email",
      headerName: "E-mail",
      width: Math.floor(screenSize / 5),
      headerClassName: classes.tableHeader,
    },
    // {
    //   field: "address",
    //   headerName: "Adresse",
    //   width: Math.floor(screenSize / 5),
    //   headerClassName: classes.tableHeader,  
        
    // },
  ];
   
  useEffect(() => {
    professorStore.getAllProfessor();

  }, [professorStore]);

  const searchFilter = (searchField: any) => {
    if (searchField !== "" ) {
      professorStore.getFilteredProfessor({ filter: searchField });
      
    } 
    // else if(searchField !== ""){
    //   userStore.getFilteredStudentArchive({ filter: searchField });  
      
    // }
    else {
      professorStore.getAllProfessor();
    }
  };

  // const handlePageChange = (page: number) => {
  //   userStore.fetchNextPage(page);
  // };

  const createNew = () => {
    professorStore.setSelectedProfessor(null);
    professorStore.resetProfessor();
    professorStore.allProfessor = [];
    history.push("/professor/new-professor");
  };

  const onRowSelected = (dataSelected: any) => {
    professorStore.setSelectedProfessor(dataSelected);
    professorStore.allProfessor = [];
    history.push("/professor/new-professor");
  };

  const currentPaths = [
    { label: "Dashboard", path: "/" },
    { label: "Enseignant", path: "/professor/list" },
    { label: "Liste des Enseignants", path: "/professor/list" },
  ];


  return (
    <ListComponent
      columns={columns}
      rows={professorStore.allProfessor}
      paths={currentPaths}
      clickSearchData={searchFilter}
      loading={professorStore.isLoading}
      onRowClick={onRowSelected}
      createNewData={createNew}
      // FilerComponent={UserFilter}
      // handlePageChange={handlePageChange}
      withCreate={true}

    />
  );
};

export default inject("professorStore")(observer(ListProfessor));
