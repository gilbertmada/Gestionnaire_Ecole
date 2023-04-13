import axios from 'axios';
import { action, makeObservable, observable, runInAction } from 'mobx';
import config from '../config';
import { parseError } from '../services/utils';
import { IClasse } from '../common/interface/classeInterface/classeInterface';
import { IProfessor } from '../common/interface/classeInterface/professorClasse';
import rootStore from './AppStore';

export interface ClasseStoreInterface {
    isLoading: boolean;
    allClass: IClasse[];
    prof: IProfessor | null;
    day: any;
    horror: any;
    class: IClasse | null;
    isFromBooking: boolean;
    setIsFromBooking: (val: boolean) => void;
    setDay: (day: any ) => void;
    setHorror: (hor: any) => void;
    setClass: (cla: IClasse | null) => void;
    setProf: (professor: IProfessor | null) => void;
    getAllClass: () => Promise<any>;
    createClasses: (data: IClasse) => void;
    deleteTotalClasses: (data: IClasse) => void;
    getFilteredClasse: (filter: Record<string, unknown>) => Promise<any>;
}

class Classes implements ClasseStoreInterface {

    @observable isLoading = false;

    @observable class: IClasse | null = null;

    @observable prof: IProfessor | null = null;

    @observable isFromBooking = false;

    @observable allClass: IClasse[] = [];

    @observable day: any[] = [];

    @observable horror: any[] = [];

    @action setClass = (data: IClasse | null) => {
        this.class = data;
    };


    @action setDay = (data: any[]) => {
        this.day = data;
    };


    @action setHorror = (data:any[]) => {
        this.horror = data;
    };

    @action setProf = (data: IProfessor | null) => {
        this.prof = data;
    };

    @action setIsFromBooking = (val: boolean) => {
        this.isFromBooking = val;
    };

    constructor() {
        makeObservable(this)
    }

    @action createClasses = async (data: IClasse) => {
        try {
    

            const add = await axios.post(`${config.servers.apiUrl}classes`, data);
 

            rootStore.succesSnackBar(true, 'Classe ajouter avec succès');
            return add;

        } catch (err: any) {
            if (err.message.includes('code 400')) {
                rootStore.updateSnackBar(true, 'Le type ');
                return;
            }
          
            rootStore.updateSnackBar(true, "Une erreur s'est produite. Veuillez réessayer plus tard!");
        }

    };


  @action getFilteredClasse = async (filter: Record<string, unknown>) => {
    try {
      this.isLoading = true;
      const classFilter = await axios.post(`${config.servers.apiUrl}classes/filter`,
        {
          filter,

        }
      );


      runInAction(() => {
        this.allClass = classFilter.data;
        this.isLoading = false;
      });

      return classFilter.data;
    } catch (error) {
      parseError(
        error,
        "Une erreur s'est produite lors de la requête de vos infos. Veuillez réessayer"
      );
    } finally {
      this.isLoading = false;
    }
  };


    @action getAllClass = async () => {
        this.isLoading = true;
        try {
            const classes = await axios.get(`${config.servers.apiUrl}classes/get`);
            this.allClass = classes.data;
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

    @action deleteTotalClasses = async (classeDelete: IClasse) => {
        try {

            const student = await axios.patch(`${config.servers.apiUrl}classes/deleteTotal`, classeDelete);

            rootStore.updateSnackBar(true, 'Supprimé', 'success');
            return student;
        } catch (err) {
            parseError(err, {
                404: "La classe demandée est introuvable",        
            });
        }
    };
}
export default new Classes();