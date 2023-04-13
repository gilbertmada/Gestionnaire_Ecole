import { GridColDef } from "@material-ui/data-grid";
import AddIcon from "@material-ui/icons/Add";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import { FooterIcon } from "../../../common/interface";
import EditFooter from "../../../common/EditFooter";
import { inject, observer } from "mobx-react";
import { FC, useEffect, useLayoutEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import photo from "../../../Assets/images/person.png";
import ListComponent from "../../../common/List";
import { usersRoles } from "../../../common/utils/data";
import Button from "@material-ui/core/Button";
import exportPDFStore from "../../../store/ExportPDFStore";
import rootStore from '../../../store/AppStore';
import config from "../../../config/index";
import { toJS } from "mobx";
import { ClasseStoreInterface } from "../../../store/ClasseStore";
import { ProfessorStoreInterface } from "../../../store/ProfessorStore";
import { AbstractEmptyInterface } from "../../../types";
import useStyles from "./style";


interface ListClassProps extends AbstractEmptyInterface {
  classeStore: ClasseStoreInterface;
  professorStore: ProfessorStoreInterface;
}

const ListClass: FC<AbstractEmptyInterface> = (props: any) => {

  const { classeStore, professorStore } = props as ListClassProps;

  const classes = useStyles();
  const history = useHistory();
  const [screenSize, setScreenSize] = useState(1024);
  const [isArchive, setIsArchive] = useState(false);



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
      field: "firstName",
      headerName: "Nom de Professeur",
      width: Math.floor(screenSize / 7),
      headerClassName: classes.tableHeader,
      valueFormatter: (params) => params.row?.prof?.firstName,

    },
    {
      field: "lastName",
      headerName: "Prénom de Professeur",
      width: Math.floor(screenSize / 7),
      headerClassName: classes.tableHeader,
      valueFormatter: (params) => params.row?.prof?.lastName,
    },
    {
      field: "IM",
      headerName: "IM de Professeur",
      width: Math.floor(screenSize / 7),
      headerClassName: classes.tableHeader,
      valueFormatter: (params) => params.row?.prof?.IM,
    },
    {
      field: "email",
      headerName: "Email de Professeur",
      width: Math.floor(screenSize / 7),
      headerClassName: classes.tableHeader,
      valueFormatter: (params) => params.row?.prof?.email,
    },
    {
      field: "matiere",
      headerName: "Matière",
      width: Math.floor(screenSize / 7),
      headerClassName: classes.tableHeader,
      valueFormatter: (params) => params.row?.prof?.matiere,
    },
    {
      field: "schoolName",
      headerName: "Ecole",
      width: Math.floor(screenSize / 8),
      headerClassName: classes.tableHeader,
    },
    {
      field: "className",
      headerName: "Nom de classe",
      width: Math.floor(screenSize / 8),
      headerClassName: classes.tableHeader,

    },
  ];

  useEffect(() => {
    classeStore.getAllClass();

  }, [classeStore]);

  const listClass = toJS(classeStore.allClass);


  const searchFilter = (searchField: any) => {
    if (searchField !== "") {

      for (let i = 0; i < listClass.length; i++) {

        if (searchField === listClass[i].prof?.firstName.trim() ||
          searchField === listClass[i].prof?.lastName.trim()

        ) {

          classeStore.getFilteredClasse({ filter: searchField })

          setIsArchive(false);

        }
        else if (searchField === listClass[i].className) {

          classeStore.getFilteredClasse({ filter: listClass[i].className });
          setIsArchive(true);

        }
      }
    } else {
      classeStore.getAllClass();
    }

  };


  const createNew = () => {
    // studentStore.setSelectedStudent(null);
    classeStore.allClass = [];
    history.push("/class/new-class");
  };

  const onRowSelected = (dataSelected: any) => {
    // classeStore.setSelectedStudent(dataSelected);
    // classeStore.allClass = [];
    history.push("/class/list");
  };

  const currentPaths = [
    { label: "Dashboard", path: "/" },
    { label: "Classes", path: "/class/list" },
    { label: "Liste des classes", path: "/class/list" },
  ];

  const handleDownload = () => {
    if (isArchive === false) {
      rootStore.updateSnackBar(true, 'Vous devez saisir le nom de classe');
    } else {
      const listFilters = toJS(classeStore.allClass);
      exportPDFStore.exportPdfEmploiDuTemps(listFilters);
    }


  }
  const footerIcons: FooterIcon[] = [

    {
      id: 0,
      ItemIcon: PictureAsPdfIcon,
      onClick: handleDownload,
      title: "Exporter en PDF",
    },


  ];

  return (
    <div>
      <ListComponent
        columns={columns}
        rows={listClass}
        paths={currentPaths}
        clickSearchData={searchFilter}
        loading={classeStore.isLoading}
        onRowClick={onRowSelected}
        createNewData={createNew}
        // FilerComponent={UserFilter}
        withCreate={true}

      />
      <EditFooter icons={footerIcons} />
    </div>

  );
};

export default inject("classeStore")(observer(ListClass));
