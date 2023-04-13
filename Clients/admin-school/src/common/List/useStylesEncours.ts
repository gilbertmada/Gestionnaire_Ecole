import { red } from '@material-ui/core/colors';
import makeStyles from '@material-ui/core/styles/makeStyles';
import tableHeader from "./style";

const contentCommonStyle = {
  background: '#F3F3F3',
  padding: '5px 5px 20px 5px',
  borderRadius: '5px 5px 5px 5px',
  boxShadow: '2px 2px #DADADA',
};

const indicatorStyle = {
  padding: '10px',
  backgroundColor: '#bcd35b',
  borderRadius: '50%',
  margin: 'auto',
};

const useStyles = makeStyles({
  available: indicatorStyle,

  // gris
  working: {
    ...indicatorStyle,
    backgroundColor: '#7c7c7c',
  },

  // orange
  expireDateReturned: {
    ...indicatorStyle,
    backgroundColor: '#FF8C00',
  },

  // bleu
  released: {
    ...indicatorStyle,
    backgroundColor: '#0072ff',
  },

  // jaune
  notReturned: {
    ...indicatorStyle,
    backgroundColor: '#e2c600',
  },

  // violet
  blocked: {
    ...indicatorStyle,
    backgroundColor: '#c476ff',
  },
  // red
  havedebt: {
    // padding: '10px',
    backgroundColor: '#df2416',
    // margin: 'auto',
  },

  content: {
    padding: '15px 15px 10px 20px',
  },
  section: {
    ...contentCommonStyle,
    marginTop: '10px',
    fontSize: '13px',
  },
  title: {
    fontSize: '2vh',
    color: 'white',
    background: '#0AB1E1',
    padding: '10px 0px 10px 10px',
  },
  item: {
    background: 'white',
    padding: '10px 10px 0px 10px',
  },
  alertItem: {
    background: 'white',
    padding: '5px 5px 0px 5px',
    height: '80%',
    border: '2px solid #C4C4C4',
  },
  enCoursItem: {
    border: '1px solid #C4C4C4',
    background: '#F3F3F3',
    fontSize: '2vh',
    padding: '1vh',
    marginBottom: '10px',
  },
  enCours: {
    fontSize: '1.5vh',
    marginBottom: '5px',
  },
  btn: {
    background: '#0AB1E1',
    color: 'white',
    height: '28px',
    fontWeight: 0,
    '&:hover': {
      backgroundColor: '#0AB1E1',
    },
  },
  btnLabel: {
    textTransform: 'capitalize',
    fontSize: '13px',
  },
  searchField: {
    width: 250,
  },
  tabRoot: {
    backgroundColor: '#dadada',
    // minWidth: 0,
    borderRadius: '15px 15px 0 0',
    '&.Mui-selected': {
      backgroundColor: '#0AB1E1',
      color: '#fff',
    },
  },
  tableHeader: {
    ...tableHeader,
    alignContent: 'center',
  },
  container: {
    backgroundColor:'green',
    borderRadius: '20px 20px 20px 20px',
    height: '50px',
    width: '100%',
    '& .MuiTableContainer-root': {
      overflowX: 'unset!important',
    },

    margin: 'auto',
    padding: 'auto',
  },
  container1: {
    backgroundColor:'green',
    borderRadius: '20px 20px 20px 20px',
    height: '50px',
    width: '100%',
    '& .MuiTableContainer-root': {
      overflowX: 'unset!important',
    },

    margin: 'auto',
    padding: 'auto',
  },
  container2: {
    height: 'auto',
    width: '100%',
    borderRadius: '20px 20px 20px 20px',
    // '& .MuiTableContainer-root':{ 
    //   overflowX: 'unset!important',
    // },
    backgroundColor:'red',
    marginTop:"20px"
  },
  tableRow: {
    '&': {
      border: 'unset'
    },

    '& .MuiTableRow-head': {
      background: '#cbcbcb',
      color: "#000",
      borderRadius: '15px 15px 0 0',
    },

    // backgroundColor: '#cbcbcb',
    // color: "#000",
    // borderRadius: '15px 15px 0 0',


    '& .MuiDataGrid-columnHeaderWrapper :nth-child(5)': {
      color: 'inherit',
      '& .MuiDataGrid-columnHeaderTitle': {
        fontWeight: 'bold'
      }
    },

    '& .MuiDataGrid-cell--editable': {
      backgroundColor: '#C5E7F0 !important',
    },

    '& .MuiDataGrid-columnSeparator': {
      display: 'none',
    },

    '& .MuiDataGrid-columnsContainer': {
      borderRadius: '15px 15px 0 0'
    },

    '& .MuiDataGrid-row': {
      width: '100%',
      height: '42px !important',
      minHeight: 'unset !important',
      maxHeight: 'unset !important',
      alignItems: 'center',
      '&.Mui-selected': {
        backgroundColor: "#d4ddb5",
      }
    },

    '& .MuiDataGrid-colCell': {
      border: '0.5px solid black',
      paddingLeft: '20px',
      '& .MuiDataGrid-columnSeparator': {
        display: 'none',
      },
    },
    '& .MuiDataGrid-cell': {
      // border: '0.5px solid #DADADA',
      border: 'none',
      '&:nth-child(5)': {
        color: '#ff082c',
        fontWeight: 'bold'
      },
      '&:focus': {
        outline: 'none',
      }
    },

    '& .MuiDataGrid-row:hover': {
      backgroundColor: '#e7f0c4 !important',
      cursor: 'pointer',
    },

    '& .MuiDataGrid-row:nth-child(even)': {
      backgroundColor: '#ebe9e9',
    }

    // 'MuiDataGrid-root-2368 MuiDataGrid-root makeStyles-tableRow-756': {
    //   width: "10"
    // }
  },
  tableCell: {
    '&': {
      border: 'unset'
    },

    '& .MuiTableRow-head': {
      background: '#cbcbcb',
      color: "#000",
      borderRadius: '15px 15px 0 0',
    },

    // backgroundColor: '#cbcbcb',
    // color: "#000",
    // borderRadius: '15px 15px 0 0',


    '& .MuiDataGrid-columnHeaderWrapper :nth-child(5)': {
      color: 'inherit',
      '& .MuiDataGrid-columnHeaderTitle': {
        fontWeight: 'bold'
      }
    },

    '& .MuiDataGrid-cell--editable': {
      backgroundColor: '#C5E7F0 !important',
    },

    '& .MuiDataGrid-columnSeparator': {
      display: 'none',
    },

    '& .MuiDataGrid-columnsContainer': {
      borderRadius: '15px 15px 0 0'
    },

    '& .MuiDataGrid-row': {
      width: '100%',
      height: '42px !important',
      minHeight: 'unset !important',
      maxHeight: 'unset !important',
      alignItems: 'center',
      '&.Mui-selected': {
        backgroundColor: "#d4ddb5",
      }
    },

    '& .MuiDataGrid-colCell': {
      border: '0.5px solid black',
      paddingLeft: '20px',
      '& .MuiDataGrid-columnSeparator': {
        display: 'none',
      },
    },
    '& .MuiDataGrid-cell': {
      // border: '0.5px solid #DADADA',
      border: 'none',
      '&:nth-child(5)': {
        color: '#ff082c',
        fontWeight: 'bold'
      },
      '&:focus': {
        outline: 'none',
      }
    },

    '& .MuiDataGrid-row:hover': {
      backgroundColor: '#e7f0c4 !important',
      cursor: 'pointer',
    },

    '& .MuiDataGrid-row:nth-child(even)': {
      backgroundColor: '#ebe9e9',
    },
    width: '20px',
    height: '20px !important',
  },
  resizeTextField: {
    fontSize: '13px',
    color: 'black',
  },
  commentaire: {
    margin: '1vh 0',
    width: '100%',
  },
  textareaAutosize: {
    width: '100%',
    padding: '2.5vh',
  },
  enCoursContent: {
    height: '34vh',
    backgroundColor: 'white',
  },
  relance: {
    margin: '10vh 0',
  },
  restFontSize: {
    fontSize: '20px',
  },
  // comment: {
  //   height: '10vh',
  //   overflowY: 'scroll',
  // },
  totalDu: {
    color: '#ff082c',
    fontWeight: 'bold'
  },
  HeaderTotalDu: {
    fontWeight: 'bold',
    fontSize: '13px',
  },
  tabRow: {
    cursor: "pointer",
  },

});

export default useStyles;
