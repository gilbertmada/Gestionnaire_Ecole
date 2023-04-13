import { GridColDef } from '@material-ui/data-grid';
import moment from "moment";

export const getColumnPrive = (
  classes: { [index: string]: string },
  screenSize: number
): GridColDef[] => {
  return [
    {
      field: 'student',
      headerName: " Prénom d'élève",
      width: Math.ceil(screenSize / 5),
      headerClassName: classes.tableHeader,
    },
    {
      field: 'matriculNumber',
      headerName: " Numéro matricule",
      width: Math.ceil(screenSize / 5),
      headerClassName: classes.tableHeader,
    },
    {
      field: 'datePayEcolage',
      headerName: "Date de payement",
      width: Math.ceil(screenSize / 4),
      headerClassName: classes.tableHeader,
    },
    {
      field: 'ecolageMonth',
      headerName: "Mois d'ecolage",
      width: Math.ceil(screenSize / 4),
      headerClassName: classes.tableHeader,
    },
    {
      field: 'ecolage',
      headerName: "Ecolage",
      width: Math.ceil(screenSize / 4),
      headerClassName: classes.tableHeader,
    },
   
  ];
};


export const getColumnDivers = (
  classes: { [index: string]: string },
  screenSize: number
): GridColDef[] => {
  return [
    {
      field: 'student',
      headerName: " Prénom d'élève",
      width: Math.ceil(screenSize / 4),
      headerClassName: classes.tableHeader,
    },
    {
      field: 'matriculNumber',
      headerName: " Numéro matricule",
      width: Math.ceil(screenSize / 4),
      headerClassName: classes.tableHeader,
    },
    {
      field: 'datePayDivers',
      headerName: "Date de payement",
      width: Math.ceil(screenSize / 3),
      headerClassName: classes.tableHeader,
    },
    {
      field: 'frais',
      headerName: 'Frais divers',
      width: Math.ceil(screenSize / 4),
      headerClassName: classes.tableHeader,
    },
   
  ];
};

export const defaultDataPrive =  {
  id: 1,
  student: '',
  matriculNumber:'',
  datePayEcolage:  moment().format("YYYY-MM-DD" ),
  ecolageMonth:'',
  ecolage:'0',
  isEcolage:false,
};
export const defaultDataDivers =  {
  id: 1,
  student: '',
  matriculNumber:'',
  datePayDivers:  moment().format("YYYY-MM-DD" ),
  frais:'0',
  isFrais:false,
};
