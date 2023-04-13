import makeStyles from '@material-ui/core/styles/makeStyles';

const forBtn = {
  background: '#0AB1E1',
  color: 'white',
  height: '28px',
  fontWeight: 0,
  '&:hover': {
    backgroundColor: '#0AB1E1',
  },
};

const useStyles = makeStyles({
  formControl: { width: '250px' },
  closeButton: {
    color: '#977F7F',
    fontSize: '20px',
  },
  paper: {
    background: 'white',
    minHeight: '90vh',
    maxHeight: '90vh',
    overflowX: 'hidden',
    width: '70%',
    '&.MuiDialog-paperWidthSm': {
      maxWidth: '70%',
    },
  },
  border: {
    borderBottom: '0.5px solid #977F7F',
    padding: '0px 0px 0px 10px',
  },
  textFieldStyle: {
    width: 200,
  },
  btnSearch: {
    ...forBtn,
  },
  btnSearchLabel: {
    textTransform: 'capitalize',
    fontSize: '13px',
  },
  tableStyle: {
    height: '60vh',
  },
  close: {
    ...forBtn,
    margin: '20px 25px 0 0',
  },
  closeOption: {
    ...forBtn,
    margin: '20px 25px 0 0',
    position: 'absolute',
    right: 0,
  },
  tableHeader: {
    background: '#0AB1E1',
    color: 'white',
    alignContent: 'center',
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
    '& .MuiDataGrid-row.active': {
      backgroundColor: '#DADADA',
    },
  },
});

export default useStyles;
