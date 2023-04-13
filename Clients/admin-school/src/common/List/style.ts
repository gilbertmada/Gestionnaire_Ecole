import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  title: {
    borderRadius: "5px 5px 5px 5px",
    boxShadow: "2px 2px #DADADA",
    background: "#F3F3F3",
    padding: "5px 0px 5px 0px",
    fontSize: "25px",
    textAlign: "center",
  },
  root: {
    backgroundColor: "#DADADA",
    width: "100vw",
    height: "100vh",

  },
  font_back: {
    backgroundColor: "#623FE3",

  },
  baseColor: {
    background: "#0AB1E1",

  },
  content: {
    padding: "15px 15px 10px 20px",

  },
  item: {
    height: "100vh",
    background: "white",
    padding: "15px 10px 10px 10px",
    borderRadius: "5px 5px 5px 5px",
    paddingTop: '1px',
  },
  columnsContainer: {
    background: "#0AB1E1",
    color: "white",
  },
  table: {
    minWidth: 700,
  },
  tableHeader: {
    background: "#067",
    color: "white",
    alignContent: "center",
    fontFamily: "Poppins sans serif",
    borderRadius: "10px 10px 10px 10px !important",
  },
  container: {
    padding: "50px",
  },
  dataGrid: {
    height: "75vh",
    width: "100%",
    "& .MuiDataGrid-root": {
      border: "unset",
    },
    
  },
  tableRow: {
    // "& .MuiDataGrid-colCell": {
    //   border: "0.5px solid #DADADA",
    //   "& .MuiDataGrid-columnSeparator": {
    //     display: "none !important",
    //   },

    // },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none'
    },
    // "& .MuiDataGrid-cell": {
    //   border: "unset",
    //   color: '#1B2838',

    // },
    "& .MuiDataGrid-row": {
      cursor: 'pointer',
      '&:hover': {
         background: 'rgba(78, 190, 242,0.3)',
        // boxShadow: '#107BDF 20px 20px 20px;',

      },
    },
    '& .MuiDataGrid-sortIcon': {
      display: "none",
    },
    '&.MuiDataGrid-root .MuiDataGrid-window': {
      marginTop: '10px',
      // backgroundColor: "#f00 !important",
      // borderRadius: "20px 20px 20px 20px",
      // backgroundColor: "#F7F7F7",
      // boxShadow: 'inset #DADADA 5px 5px 5px;',

    },
    '&.MuiDataGrid-root .MuiDataGrid-columnsContainer': {
      borderRadius: "50px 50px 50px 50px",
    },
    "& .MuiDataGrid-colCell": {
      border: "0.5px solid #F7F7F7",
      "& .MuiDataGrid-columnSeparator": {
        display: "none !important",
      },
    },
    "& .MuiDataGrid-cell": {
      border: "unset",
      color: '#1B2838',
    },
    "& .MuiDataGrid-row:hover": {
      backgroundColor: "#C5E7F0 !important",
      cursor: "pointer",
    },

  },
  container1: {
    display: 'flex',
    paddingTop: '2em',
     color: '#03a9f4',

  },
  tabRoot: {
    backgroundColor: '#dadada',
    minWidth: 0,
    borderRadius: '15px 15px 0 0',
    '&.Mui-selected': {
      backgroundColor: '#0AB1E1',
      color: '#fff',
    },
  },
});

export default useStyles;
