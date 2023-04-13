import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({

  title: {
    color: 'white',
    background: '#0AB1E1',
    padding: '10px 0px 10px 10px',
    fontWeight: 'bold',
    fontFamily: '"Roboto", sans-serif',
    // display: "flex",
    // flexAlign: "center",
    textAlign:"center",
    justifyContent: "space-between"
  },
  iconStyle :{
    "&:hover": {
      cursor: "pointer",
    }
  },
  resizeTextField: {
    fontSize: '20px',
    color: 'black',
    width:"100%"
  },
  item: {
    background: 'white',
    padding: '10px 10px 0px 10px',
    boxShadow: '2px 2px #DADADA',
  },
  itemClass: {
    background: 'white',
    padding: '10px 10px 0px 10px',
    boxShadow: '4px 4px #DADADA',
    width:'50%'
  },
  itemDay: {
    background: 'white',
    padding: '10px 10px 0px 10px',
    boxShadow: '4px 4px #DADADA',
    width:'50%'
  },
  classeGrid: {
    padding: '2vh',
  },
  selectItem: {
    backgroundColor: '#fff',
    zIndex: 10,
    '&:hover': {
      backgroundColor: '#92c2ef',
      color: '#fff',
    },
    '&.Mui-selected': {
      backgroundColor: '#92c2ef',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#92c2ef',
        color: '#fff',
      },
    },
  },
  bgWhite: {
    backgroundColor: 'white',
  },
  formWidth: {
    minWidth: 300,
  },
});

export default useStyles;
