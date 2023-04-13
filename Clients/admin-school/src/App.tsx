import './index.scss';
import DateFnsUtils from '@date-io/date-fns';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import fr from 'date-fns/locale/fr';
import { Provider as StoreProvider } from 'mobx-react';
import { useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import SnackBar from './common/SnackBar';
import { Router } from './router';
import authServices from './services/AuthServices';
import  * as stores from './store';
import myTheme from './Theme/MyTheme';

function App() {
  // Component will mount check for the session check

  const willMount = useRef(true);

  if (willMount.current) {
    authServices.isAuthenticated();
    willMount.current = false;
  }

  return (
    <MuiThemeProvider theme={myTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fr}>
        <BrowserRouter>
          <StoreProvider {...stores}>
            <div className="app">
              <SnackBar />
              <Router />
            </div>
          </StoreProvider>
        </BrowserRouter>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}

export default App;
