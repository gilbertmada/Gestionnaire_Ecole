import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({

  btn: {
    background: '#107BDF',
    color:'#F7F7F7',
    height: '28px',
    fontWeight: 0,
    '&:hover': {
      backgroundColor: '#107BDF',
    },
    borderRadius: "30px 30px 30px 30px",
    boxShadow: 'inset rgba(0, 0, 0, 0.15) 2.95px 2.95px 3.6px;',
  },
  btnFloat: {
    background: '#284853',
    color: 'white',
    height: '28px',
    fontWeight: 0,
    '&:hover': {
      backgroundColor: '#0AB1E1',
    },
    margin: '10px',
  },
  btnLabel: {
    textTransform: 'capitalize',
    fontSize: '13px',
  },
  searchField: {
    width: 150,
    
  },
  floatingButtons: {
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '100%',
  },
}));

export default useStyles;
