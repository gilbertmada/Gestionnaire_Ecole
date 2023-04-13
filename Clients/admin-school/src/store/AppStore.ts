import axios from 'axios';
import { action, makeObservable, observable, runInAction } from 'mobx';
import config from '../config';
import { parseError } from '../services/utils';
import { SnackBarSeverity } from '../types';

export interface RootStoreInterface {
  // agencies: AgencyInterface[];
  numbers: {
    usersNumber: number;
    studentNumber: number,
    professorNumber: number,
    classNumber: number,
  };
  snackBarState: {
    open: boolean;
    severity: SnackBarSeverity;
    duration: number;
    message: string;
  };
  updateSnackBar: (
    open: boolean,
    message?: string,
    severity?: SnackBarSeverity,
    duration?: number
  ) => void;
  succesSnackBar: (
    open: boolean,
    message?: string,
    severity?: SnackBarSeverity,
    duration?: number
  ) => void;
  // fetchAllAgencies: () => void;
  getCounts: () => void;
}

class AppStore implements RootStoreInterface {
  @observable numbers = {

    studentNumber: 0,
    usersNumber: 0,
    professorNumber: 0,
    classNumber:0,
  };


  // @observable agencies: AgencyInterface[] = [];

  @observable snackBarState = {
    open: false,
    severity: 'error' as SnackBarSeverity,
    duration: 6000,
    message: 'An arror happened',
  };

  constructor() {
    makeObservable(this);
  }

  @action getCounts = async () => {

    try {
      const getNumbers = await axios.get(`${config.servers.apiUrl}count`);

      runInAction(() => {
        this.numbers = getNumbers.data;
      });
    } catch (e) {
      parseError(e);
    }
  };


  @action updateSnackBar = (
    open: boolean,
    message = "Une erreur s'est produite",
    severity: SnackBarSeverity = 'error',
    duration = 4000
  ) => {
    if (!open) {
      this.snackBarState = {
        ...this.snackBarState,
        open,
      };
      return;
    }
    this.snackBarState = {
      open,
      message,
      severity,
      duration,
    };
  };

  @action succesSnackBar = (
    open: boolean,
    message = 'Succès',
    severity: SnackBarSeverity = 'success',
    duration = 4000
  ) => {
    this.snackBarState = {
      open,
      message,
      severity,
      duration,
    };
  };

}

export default new AppStore();
