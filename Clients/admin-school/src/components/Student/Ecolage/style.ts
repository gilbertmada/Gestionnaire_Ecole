import { makeStyles } from '@material-ui/core/styles';

const commonBtn = {
  background: '#0AB1E1',
  color: 'white',
  height: '28px',
  fontWeight: 0,
  '&:hover': {
    backgroundColor: '#0AB1E1',
  },
};

const styles = makeStyles({
  formControl: { width: '80%' },
  textField: { width: '90%' },
  bgWhite: {
    padding: 5,
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
  title: {
    background: '#DADADA',
    padding: '15px 20px 5px 20px',
    borderRadius: '10px 10px 0px 0px',
    fontWeight: 'bold',
    fontFamily: '"Roboto", sans-serif',
  },
  total: {
    background: '#0AB1E1',
    padding: '15px 20px 5px 20px',
    borderRadius: '10px 10px 0px 0px',
    fontWeight: 'bold',
    fontFamily: '"Roboto", sans-serif',
  },
  ecolageForm:{
    // height: '500px',
    width: '400px',
  },
  tableRow: {
    '& .MuiDataGrid-colCell': {
      border: '0.5px solid #DADADA',
      '& .MuiDataGrid-columnSeparator': {
        display: 'none',
      },
    },
    '& .MuiDataGrid-cell': {
      border: '0.5px solid #DADADA',
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: '#C5E7F0 !important',
      cursor: 'pointer',
    },
    '& .MuiDataGrid-footer': {
      display: 'none',
    },
  },
  tableHeader: {
    background: '#0AB1E1',
    color: 'white',
    alignContent: 'center',
  },
  dataGrid: {
    height: '150px',
    width: '100%',
  },
  optionsDataGrid: {
    width: '100%',
  },
  optionsTableRow: {
    '& .MuiDataGrid-colCell': {
      border: '0.5px solid #DADADA',
      '& .MuiDataGrid-columnSeparator': {
        display: 'none',
      },
    },
    '& .MuiDataGrid-cell': {
      border: '0.5px solid #DADADA',
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: '#C5E7F0 !important',
      cursor: 'pointer',
    },
  },
  marginTop: {
    marginTop: '50px',
  },
  btnContainer: {
    padding: '15px 0px 0px 0px',
  },
  btnLabel: {
    textTransform: 'capitalize',
    fontSize: '13px',
  },
  btn: commonBtn,
  selectBtn: {
    ...commonBtn,
    marginLeft: '15px',
  },
  bgColorWhite: {
    backgroundColor: 'white',
  },
  formWidth: {
    minWidth: '100%',
  },
  selectBg: {
    padding: 0,
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
  dataGridRemise: {
    height: 'auto',
    width: '100%',
  },
});

export default styles;
