import makeStyles from '@material-ui/core/styles/makeStyles';

const Styles = makeStyles((theme) => ({
  card: {
    backgroundColor: '#F7F7F7',
    height: '25vh',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '2vh',
    boxShadow: 'inset rgba(0, 0, 0, 0.15) 0px 2px 2px;',
    border: '1px solid #eee',
    borderRadius: '20px 20px 20px 20px',
    '&:hover': {
      boxShadow: '#107BDF 0.2px 2.95px 4px',
    },
  },

  img: {
    width: '10vh',
    height: '10vh',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
  },

  container: {
    width: '90%',
    margin: '0px 20px',
    padding: '5vh 0',
    [theme.breakpoints.down('sm')]: {
      margin: '-30px 50px',
      padding: '10vh 0' 
    },
  },
  number: {
    height: '30px',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  numberAlert: {
    color: 'red',
    height: '30px',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  ds: {
    width: '45vh',
    background: '#107BDF',
    // backgroundColor: 'white',
    display: 'flex',
    boxShadow: '#F7F7F7 3px 0',
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      backgroundColor: 'white',
      display: 'none',
      '& div:nth-child(2)': {
        marginBottom: '26px',
      }  
    },

  },
  ds0: {
    display: 'flex',
    height: '88vh',
    [theme.breakpoints.down('sm')]: {
      backgroundColor: 'white',
    },

  },
  profil : {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: '#ff0000 10px',
    textAlign: 'center',

  },
  userName: {
    fontStyle: 'italic',
    fontSize: '15px',
    textAlign: 'center',
  },
  userDate: {
    fontSize: '15px',
    textAlign: 'center',
  },
  calendar: {
    width: '500px',
    height: '500px',
  },
  image: {
    marginBottom: "auto",
    paddingTop: "60px",
  },
  calendrier2: {
    marginBottom: '30px',
    '& .MuiPaper-elevation1':{
      boxShadow: '1px -1px 1px #0000000f',
    },
  },

}));

export default Styles;
