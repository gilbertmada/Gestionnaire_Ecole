import makeStyles from '@material-ui/core/styles/makeStyles';

const contentCommonStyle = {
  background: '#F3F3F3',
  padding: '5px 0px 5px 0px',
  borderRadius: '5px 5px 5px 5px',
  boxShadow: '2px 2px #DADADA',
};

const useStyles = makeStyles({
  root:{
    background: '#0AB1E1',
    color: 'white',
  },
  link: {
    background: '#0AB1E1',
    color: 'white',
    position: 'absolute',
    padding: '0px 10px 0px 10px',
    borderBottomRightRadius: '5px',
  },
  content: {
    padding: '15px 15px 0px 20px',
  },
  fields: {
    ...contentCommonStyle,
    marginTop: '1px',
    minHeight: '65vh',
  },
  firstSection: {
    ...contentCommonStyle,
    margin: '5px 10px 10px 10px',
    padding: '0px 10px 10px 15px',
    background: 'white',
  },
  footer: {
    background: '#0AB1E1',
    padding: '15px 0px 0px 0px',
    marginTop: '15px',
    minWidth: '100%',
  },
  whiteColor: {
    color: 'white',
  },
  formWidth: {
    minWidth: 120,
  },
  diplayDiv: {
    display: 'none',
  },
  AvatarUploadStyle: {
    paddingTop: '10px',
    padding: '70px',
  },
});

export default useStyles;
