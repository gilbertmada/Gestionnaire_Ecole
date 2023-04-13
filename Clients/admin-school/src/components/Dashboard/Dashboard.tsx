import Box from '@material-ui/core/Box';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { inject, observer } from 'mobx-react';
import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import rowData from '../../common/Dashboard/data';
import HeaderPath from '../../common/HeaderPath';
import photo from "../../Assets/images/person.png";
import config from "../../config/index";
import { authStore } from '../../store';
import { RootStoreInterface } from '../../store/AppStore';
import { UserStoreInterface } from '../../store/UserStore';
import { AbstractEmptyInterface } from '../../types';
import Style from './style';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import idLocale from "date-fns/locale/id";
import { MuiPickersUtilsProvider, Calendar } from "@material-ui/pickers";
import Paper from '@material-ui/core/Paper';
import UserMenu from "../../common/Layout/UserMenu";
import { fr } from "date-fns/locale";
import { toJS } from 'mobx';

interface DashBoardProps extends AbstractEmptyInterface {
  rootStore: RootStoreInterface;
  userStore: UserStoreInterface;
}

const Dashboard: FC<AbstractEmptyInterface> = props => {
  const { rootStore, userStore } = props as DashBoardProps;
  const classes = Style();
  const history = useHistory();
  const date = new Date();
  const getMonth = date.getMonth() + 1;
  const month = getMonth.toString().length === 1 ? `0${getMonth}` : getMonth;
  const formatDate = `${date.getDate()}/${month}/${date
    .getFullYear()
    .toString()
    .substring(2)}`;


  const redirect = (link: string) => () => {
    if (link === "/user/list" && userStore.user?.role === 'COLLABORATEUR') {
      return;
    }
    history.push(link);
  };



  useEffect(() => {
    rootStore.getCounts();
  }, [rootStore]);

  const dashboardItems = rowData();

  setInterval(() => {
    setHour(moment().format('h:mm'));
  }, 1000);



  const [houor, setHour] = useState(moment().format('h:mm:ss'))

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [anchorEl, setAnchorEl] = useState(null);

  const handleDateChangeCalendar = (dates: any) => {
    setSelectedDate(dates);
  };

  const handleOpenUserMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const pathHeader = `/${authStore.tokenUrl}`


  return (
    <div className={classes.ds0}>

      <div className={classes.ds}>
        <div className={classes.image}>
          <img src={`${config.servers.apiUrl}${userStore.user?.photo.replace("/uploadFile", "uploadFile")}` || photo} alt="profilephoto" className={classes.profil} />
          <div className={classes.userName}>
            Bonjour {userStore.user?.firstName}
            <br />
            <div className={classes.userDate}>
              {formatDate}
            </div>

            {houor}
          </div>
        </div>
        <UserMenu
              anchorEl={anchorEl}
              handleClose={handleCloseUserMenu}
              currentUser={userStore.user}
            /> 

        <div className={classes.calendrier2}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fr}>

            <Paper style={{ overflow: "hidden" }}>
              <Calendar
                date={selectedDate}
                onChange={handleDateChangeCalendar}
              />
            </Paper>
          </MuiPickersUtilsProvider>
        </div>

      </div>
      <HeaderPath paths={[{ label: 'Dashboard', path: "/" }]} />
      {/* <HeaderPath paths={[{ label: 'Dashboard', path: `/${userStore.user?.urlPlus}` }]} /> */}

      <div className={classes.container}>
        <Grid container={true}>
          {dashboardItems.map((item: any) => {
            if (item.permissions && !item.permissions.includes(userStore.user?.role || '')) {
              return null;
            }

            return (
              <Grid item={true} key={item.titre} md={2} xs={6}>
                <CardActionArea className={classes.card} onClick={redirect(item.link)}>
                  <CardContent>
                    <img src={item.images} alt="SCHOOL" className={classes.img} />

                    <Box fontWeight={500} m={1} fontSize={12} textAlign="center">
                      {item.titre}
                    </Box>
                    <Box
                      fontWeight="fontWeightBold"
                      className={item.titre === 'ALERTE' ? classes.numberAlert : classes.number}
                      m={1}
                      textAlign="center">
                      {item.nbr || ''}
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Grid>
            );
          })}
        </Grid>
      </div>

    </div>
  );
};

export default inject('rootStore', 'userStore', 'authStore')(observer(Dashboard));
