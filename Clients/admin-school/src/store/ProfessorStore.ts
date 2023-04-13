import axios from 'axios';
import { action, makeObservable, observable, runInAction } from 'mobx';
import config from '../config';
import { parseError } from '../services/utils';
import { IProfessor } from '../common/interface/professorInterface';
import rootStore from './AppStore';

export interface ProfessorStoreInterface {
  failedFetchUser: boolean;
  allProfessor: IProfessor[];
  isLoading: boolean;
  professor: IProfessor | null;
  setProfessor: (professor: IProfessor | null) => void;
  getAllProfessor: () => Promise<any>;
  getFilteredProfessor: (filter: Record<string, unknown>) => Promise<any>;
  filters: { currentlyWorking: boolean };
  resetProfessor: () => void;
  updateFilters: (name: "currentlyWorking", status: boolean) => void;
  createProfessor: (data: IProfessor) => void;
  updateProfessor: (data: IProfessor) => void;
  deleteProfessor: (data: IProfessor) => void;
  selectedProfessor: IProfessor | null;
  setSelectedProfessor: (data: IProfessor | null) => void;

}

class ProfessorStore implements ProfessorStoreInterface {

  @observable failedFetchUser = false;

  @observable professor: IProfessor | null = null;

  @observable selectedProfessor: IProfessor | null = null;

  @observable allProfessor: IProfessor[] = [];


  @observable isLoading = false;


  constructor() {
    makeObservable(this);
  }

  @action setProfessor = (p: IProfessor | null) => {
    this.professor = p;
  };

  @action resetProfessor = () => {
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

  @action setSelectedProfessor = (professor: IProfessor | null) => {
    this.selectedProfessor = professor;
  };

  @action updateFilters = (name: "currentlyWorking", status: boolean) => {

    if (status === true) {
      this.filters = { ...this.filters, [name]: status };
      this.getFilteredProfessor({ filter: "" });

    }
    // if(status === false){
    //   this.filters = { ...this.filters, [name]: status };
    //   this.getFilteredUserArchive({ filter: "" });
    // }

  };


  @action getAllProfessor = async () => {
    this.isLoading = true;
    try {
      const professors = await axios.get(`${config.servers.apiUrl}professor/`);
      this.allProfessor = professors.data;
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


  @action getFilteredProfessor = async (filter: Record<string, unknown>) => {
    try {
      this.isLoading = true;
      const professor = await axios.post(`${config.servers.apiUrl}professor/filter`,
        {
          filter,

        }
      );

      runInAction(() => {
        this.allProfessor = professor.data;
        this.isLoading = false;
      });
      // this.allUsers = users.data;
      // this.isLoading = false;

      return professor.data;
    } catch (error) {
      parseError(
        error,
        "Une erreur s'est produite lors de la requête de vos infos. Veuillez réessayer"
      );
    } finally {
      this.isLoading = false;
    }
  };


  @action createProfessor = async (data: IProfessor) => {
    try {

      const add = await axios.post(`${config.servers.apiUrl}professor`, data);

      if (add.data.email === 'Email already exists') {
        rootStore.updateSnackBar(true, 'E-mail existe déjà');
        return;
      }

      rootStore.succesSnackBar(true, 'Professeur ajouter avec succès');
      return add;
    } catch (err: any) {
      if (err.message.includes('code 400')) {
        rootStore.updateSnackBar(true, 'Le type ');
        return;
      }

      rootStore.updateSnackBar(true, "Une erreur s'est produite. Veuillez réessayer plus tard!");
    }
  };


  @action updateProfessor = async (profUpdate: IProfessor) => {
    try {
      const professor = await axios.patch(`${config.servers.apiUrl}professor/edit`, profUpdate);
     
        rootStore.updateSnackBar(true, 'Modifié', 'success');

      return professor;
    } catch (err) {
      parseError(err, {
        404: "Le professeur demandé est introuvable",
        403: 'Vous ne pouvez pas effectuer cette opération ou le mot de passe entré est incorrect',
      });
    }
  };

  @action deleteProfessor = async (profDelete: IProfessor) => {
    try {
      const professor = await axios.patch(`${config.servers.apiUrl}professor/delete`, profDelete);
      rootStore.updateSnackBar(true, 'Supprimé', 'success');
      return professor;
    } catch (err) {
      parseError(err, {
        404: "LE professeur demandé est introuvable",
        403: 'Vous ne pouvez pas effectuer cette opération ou le mot de passe entré est incorrect',
      });
    }
  };

}

export default new ProfessorStore();