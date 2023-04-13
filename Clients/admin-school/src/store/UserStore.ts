import axios from 'axios';
import { action, makeObservable, observable, runInAction } from 'mobx';
import config from '../config';
import { parseError } from '../services/utils';
import { IUser } from '../common/interface/userInterface';
import rootStore from './AppStore';

export interface UserStoreInterface {
  failedFetchUser: boolean;
  isGettingInfo: boolean;
  allUsers: IUser[];
  isLoading: boolean;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  getUserInfo: () => void;
  updateUserInfo: (userUpdate: IUser & { newPassword?: string }) => void;
  getAllUser: () => Promise<any>;
  getFilteredUser: (filter: Record<string, unknown>) => Promise<any>;
  // getFilteredUserArchive: (filter: Record<string, unknown>) => Promise<any>;
  filters: { currentlyWorking: boolean };
  resetUser: () => void;
  updateFilters: (name: "currentlyWorking", status: boolean) => void;
  createUser: (data: IUser) => void;
  updateUser: (data: IUser) => void;
  deleteUser: (data: IUser) => void;
  // archiveUser: (data: IUser) => void;
  // deleteTotalUser: (data: IUser) => void;
  selectedUser: IUser | null;
  setSelectedUser: (data: IUser | null) => void;
  getAllUserAdmin: () => void;
  userAdmin: IUser[];
}

class UserStore implements UserStoreInterface {

  @observable isGettingInfo = false;

  @observable failedFetchUser = false;


  @observable user: IUser | null = null;

  @observable selectedUser: IUser | null = null;

  @observable userAdmin: IUser[] = [];

  @observable allUsers: IUser[] = [];

  @observable isLoading = false;


  constructor() {
    makeObservable(this);
  }

  @action setUser = (u: IUser | null) => {
    this.user = u;
  };

  @action resetUser = () => {
    this.filters = {
      // immo: false,
      available: true,
      currentlyWorking: true,
      isBlocked: false,
    };
  }

  @observable filters = {
    // immo: false,
    available: true,
    currentlyWorking: true,
    isBlocked: false,
  };

  @action setSelectedUser = (user: IUser | null) => {
    this.selectedUser = user;
  };

  @action updateFilters = (name: "currentlyWorking", status: boolean) => {

    if (status === true) {
      this.filters = { ...this.filters, [name]: status };
      this.getFilteredUser({ filter: "" });

    }
    // if(status === false){
    //   this.filters = { ...this.filters, [name]: status };
    //   this.getFilteredUserArchive({ filter: "" });
    // }

  };

  @action getUserInfo = async () => {
    try {
      this.isGettingInfo = true;
      const me = await axios.get(`${config.servers.apiUrl}user/me`);
      this.isGettingInfo = false;
      if (me.data) {
        runInAction(() => {
          this.user = me.data as IUser;
        });
      }

    } catch (error) {
      this.isGettingInfo = false;
      this.failedFetchUser = true;
      parseError(
        error,
        "Une erreur s'est produite lors de la requête de vos infos. Veuillez réessayer"
      );
    }
  };


  @action updateUserInfo = async (userUpdate: IUser /* & { newPassword?: string | undefined } */ ) => {

    try {
      const user = await axios.patch(`${config.servers.apiUrl}user/${userUpdate._id}`, userUpdate);
 
      if (user.data.acknowledged === true) {
        this.getUserInfo();
        rootStore.updateSnackBar(true, 'Enregistré', 'success');
      } else {
        rootStore.updateSnackBar(true, 'Echec de la modification', 'error');
      }
    } catch (err) {
      parseError(err, {
        404: "L'utilisateur demandé est introuvable",
        403: 'Vous ne pouvez pas effectuer cette opération ou le mot de passe entré est incorrect',
      });
    }
  };

  @action getAllUser = async () => {
    this.isLoading = true;
    try {
      const users = await axios.get(`${config.servers.apiUrl}user/`);
      this.allUsers = users.data;
      this.isLoading = false;
    } catch (error) {
      parseError(
        error,
        "Une erreur s'est produite lors de la requête de vos infos. Veuillez réessayer"
      );
      this.isLoading = false;
    } finally {
      this.isLoading = false;
    }
  };

  @action getAllUserAdmin = async () => {
    this.isLoading = true;
    try {
      const users = await axios.get(`${config.servers.apiUrl}user/allAdmin`);
      this.userAdmin = users.data;
      this.isLoading = false;
      // return users.data;
    } catch (error) {
      parseError(
        error,
        "Une erreur s'est produite lors de la requête de vos infos. Veuillez réessayer"
      );
      this.userAdmin = [];
    } finally {
      this.isLoading = false;
    }
  };

  @action getFilteredUser = async (filter: Record<string, unknown>) => {
    try {
      this.isLoading = true;
      const users = await axios.post(`${config.servers.apiUrl}user/filter`,
        {
          filter,

        }
      );

      runInAction(() => {
        this.allUsers = users.data;
        this.isLoading = false;
      });
      // this.allUsers = users.data;
      // this.isLoading = false;

      return users.data;
    } catch (error) {
      parseError(
        error,
        "Une erreur s'est produite lors de la requête de vos infos. Veuillez réessayer"
      );
    } finally {
      this.isLoading = false;
    }
  };


  @action createUser = async (data: IUser) => {
    try {

      const add = await axios.post(`${config.servers.apiUrl}user`, data);

      if (add.data.email === 'Email already exists') {
        rootStore.updateSnackBar(true, 'E-mail existe déjà');
        return;
      }
      if (add.data.username === 'Username already exists') {
        rootStore.updateSnackBar(true, "Le nom d ' utilisateur existe déjà");
        return;
      }

      rootStore.succesSnackBar(true, 'Utilisateur ajouter avec succès');
      return add;
    } catch (err:any) {
      if (err.message.includes('code 400')) {
        rootStore.updateSnackBar(true, 'Le type ');
        return;
      }

      rootStore.updateSnackBar(true, "Une erreur s'est produite. Veuillez réessayer plus tard!");
    }
  };


  @action updateUser = async (userUpdate: IUser) => {
    try {
      const user = await axios.patch(`${config.servers.apiUrl}user/edit`, userUpdate);

      rootStore.updateSnackBar(true, 'Modifié', 'success');

      if (this.user?._id === userUpdate._id) {
        this.getUserInfo();
      }

      return user;
    } catch (err) {
      parseError(err, {
        404: "L'utilisateur demandé est introuvable",
        403: 'Vous ne pouvez pas effectuer cette opération ou le mot de passe entré est incorrect',
      });
    }
  };

  @action deleteUser = async (userDelete: IUser) => {
    try {
      const user = await axios.patch(`${config.servers.apiUrl}user/delete`, userDelete);
      rootStore.updateSnackBar(true, 'Supprimé', 'success');
      return user;
    } catch (err) {
      parseError(err, {
        404: "L'utilisateur demandé est introuvable",
        403: 'Vous ne pouvez pas effectuer cette opération ou le mot de passe entré est incorrect',
      });
    }
  };

}

export default new UserStore();