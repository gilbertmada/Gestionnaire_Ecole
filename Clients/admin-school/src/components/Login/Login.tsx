import IconButton from '@material-ui/core/IconButton';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LoginIcon from '@material-ui/icons/Input';
import LockIcon from '@material-ui/icons/Lock';
import UserIcon from '@material-ui/icons/Person';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { inject, observer } from 'mobx-react';
import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import authServices from '../../services/AuthServices';

import { AuthStoreInterface } from '../../store/AuthStore';
import { AbstractEmptyInterface } from '../../types';
import useStyles from './style';
import { UserStoreInterface } from '../../store/UserStore';


interface LoginProps extends AbstractEmptyInterface {
  authStore: AuthStoreInterface;
  userStore: UserStoreInterface;
}

type FirstEnter = { count: number, isFirst: boolean };

const Login: FC<AbstractEmptyInterface> = props => {
  const { authStore, userStore } = props as LoginProps;
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ fadeIn, setFadeIn ] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);
  const [ firstEnter, setFirstEnter ] = useState<FirstEnter>({count: 0, isFirst: true} as FirstEnter)
  const classes = useStyles();

  const handleChangeUsername = (e: any) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleEnterKey = (e: KeyboardEvent | any) => {
    if (e.code === 'Enter') {
      handleSubmit();
    }
  };
  
  const random: any = `${Math.random()}`;
  const words= random.split(".")

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = async () => {
    if (authStore.isLogginIn) return;
    await authStore.login(username, password);
    if (authServices.isAuthenticated()) {
      authStore.setTokenUrl(words[1]);

      history.replace("/");
    }
  };


   return (
    <div className={classes.root}>
      <div className={classes.container}>
        {/* <div className={classes.leftBox}>
          <img alt="background" src={background_school} /> 
        </div>  */}
        <div className={classes.rightBox}>
        
          <div className={classes.textCenter}>
            <span className={classes.title}>SCHOOL GESTION</span>
            <br />
            <span className={classes.small}>Logiciel</span>
          </div>
          <div className={`${classes.formGroup} ${classes.marginTop}`}>
            <UserIcon />
            <TextField
              required={true}
              id="user-login"
              label="E-mail ou login"
              onChange={handleChangeUsername}
              value={username}
              color="secondary"
              onKeyPress={handleEnterKey}
            />
          </div>
          <div className={classes.formGroup}>
            <LockIcon />
            <TextField
              id="user-password"
              label="Mot de passe"
              type="password"
              autoComplete="current-password"
              onChange={handleChangePassword}
              value={password}
              color="secondary"
              onKeyPress={handleEnterKey}
            />
          </div>
          <div className={classes.textCenter}>
            <IconButton
              disabled={authStore.isLogginIn}
              className={classes.coloredIcon}
              onClick={handleSubmit}>
              <LoginIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  ); 
};

export default inject('authStore', 'userStore')(observer(Login));
