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
import { StudentStoreInterface } from "../../../store/StudentStore";
import { AbstractEmptyInterface } from "../../../types";
import useStyles from "./style";


interface ListStudentProps extends AbstractEmptyInterface {
  studentStore: StudentStoreInterface;
}

const ListStudent: FC<AbstractEmptyInterface> = (props: any) => {

  const classes = useStyles();
  const history = useHistory();
  const [screenSize, setScreenSize] = useState(1024);
  const [open, setOpen] = useState(false);

  const { studentStore } = props as ListStudentProps;

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
      field: "matriculNumber",
      headerName: "Numéro matricule",
      width: Math.floor(screenSize / 7),
      headerClassName: classes.tableHeader,
    },
    {
      field: "height",
      headerName: "Niveau",
      width: Math.floor(screenSize / 7),
      headerClassName: classes.tableHeader,
    },
    {
      field: "class",
      headerName: "Nom de classe",
      width: Math.floor(screenSize / 5),
      headerClassName: classes.tableHeader,
    },
    {
      field: "address",
      headerName: "Adresse",
      width: Math.floor(screenSize / 5),
      headerClassName: classes.tableHeader,

    },
  ];

  useEffect(() => {
    studentStore.getAllStudent();

  }, [studentStore]);

  const listStudents = toJS(studentStore.allStudent);

  const searchFilter = (searchField: any) => {

    for (let i = 0; i < listStudents.length; i++) {
      if (searchField === listStudents[i].firstName.trim() ||
        searchField === listStudents[i].lastName.trim() ||
        searchField === listStudents[i].height.trim()
      ) {
        

        studentStore.getFilteredStudent({
          filter: searchField
        });

        setOpen(false);
      }
      else if (searchField === listStudents[i].class) {

        studentStore.getFilteredStudent({ filter: listStudents[i].class });
        setOpen(true);

      }
      else if (searchField === "") {
        studentStore.getAllStudent();
      }
    }

  };


  const createNew = () => {
    studentStore.setSelectedStudent(null);
    studentStore.resetStudent();
    studentStore.allStudent = [];
    history.push("/student/new-student");
  };

  const onRowSelected = (dataSelected: any) => {
    studentStore.setSelectedStudent(dataSelected);
    studentStore.allStudent = [];
    history.push("/student/new-student");
  };

  const currentPaths = [
    { label: "Dashboard", path: "/" },
    { label: "Elèves", path: "/student/list" },
    { label: "Liste des élèves", path: "/student/list" },
  ];

  const handleDownload = () => {

    if (open === false) {

      rootStore.updateSnackBar(true, 'Vous devez filtrer le nom de classe');

    } else {

      const listFilters = toJS(studentStore.allStudent);
      exportPDFStore.exportToPdfListStudent(listFilters);
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
        rows={studentStore.allStudent}
        paths={currentPaths}
        clickSearchData={searchFilter}
        loading={studentStore.isLoading}
        onRowClick={onRowSelected}
        createNewData={createNew}
        // FilerComponent={UserFilter}
        withCreate={true}

      />
      <EditFooter icons={footerIcons} />
    </div>

  );
};

export default inject("studentStore")(observer(ListStudent));
