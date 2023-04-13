import { GridColDef,GridValueGetterParams } from '@material-ui/data-grid';
// import { profRoles } from "../utils/data";

export const getProfessorColumns = (
  classes: { [index: string]: string },
  screenSize: number
): GridColDef[] => {
  return [
    // {
    //   field: 'driverNumber',
    //   headerName: 'N° Conducteur',
    //   width: Math.ceil(screenSize / 5),
    //   headerClassName: classes.tableHeader,
    // },
    // {
    //   field: 'firstName',
    //   headerName: 'Nom',
    //   width: Math.ceil(screenSize / 5),
    //   headerClassName: classes.tableHeader,
    // },
    // {
    //   field: 'lastName',
    //   headerName: 'Prénom',
    //   width: Math.ceil(screenSize / 5),
    //   headerClassName: classes.tableHeader,
    // },
    // {
    //   field: 'permisNumber',
    //   headerName: 'N° permis',
    //   width: Math.ceil(screenSize / 5),
    //   headerClassName: classes.tableHeader,
    // },
    // {
    //   field: 'portable',
    //   headerName: 'Portable',
    //   width: Math.ceil(screenSize / 5),
    //   headerClassName: classes.tableHeader,
    // },
    // {
    //   field: 'civility',
    //   headerName: 'Civilité',
    //   width: Math.ceil(screenSize / 5),
    //   headerClassName: classes.tableHeader,
    //   valueFormatter: params => params.row?.customCustomer?.civility !== "" ?
    //   `${params.row?.customer?.civility}` : `${params.row?.customCustomer?.civility}`
    //   ,
    // },
    // {
    //   field: 'companyName',
    //   headerName: 'Nom Société',
    //   width: Math.ceil(screenSize / 5),
    //   headerClassName: classes.tableHeader,
    //   valueGetter: (params: GridValueGetterParams) =>`${params.row?.customCustomer?.companyName || ''}`,
    // },
    // {
    //   field: 'managerName',
    //   headerName: 'Nom du gérant',
    //   width: Math.ceil(screenSize / 5),
    //   headerClassName: classes.tableHeader,
    //   valueGetter: (params: GridValueGetterParams) =>`${params.row?.customCustomer?.managerName || ''}`,
    // },
    // {
    //   field: 'email',
    //   headerName: 'E-mail',
    //   width: Math.ceil(screenSize / 5),
    //   headerClassName: classes.tableHeader,
    // },
    // {
    //   field: 'city',
    //   headerName: 'City',
    //   width: Math.ceil(screenSize / 5),
    //   headerClassName: classes.tableHeader,
    // },
    {
        field: "IM",
        headerName: "IM",
        width: Math.floor(screenSize / 7),
        headerClassName: classes.tableHeader,
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
    //   {
    //     field: "role",
    //     headerName: "Rôle",
    //     width: Math.floor(screenSize / 7),
    //     headerClassName: classes.tableHeader,
    //     valueFormatter: (params) =>
    //       profRoles.find((role) => role.code === params.row.role)?.label,
          
          
    //   },

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
  ];
};