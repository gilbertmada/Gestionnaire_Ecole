import axios from 'axios';
import { action, makeObservable, observable, runInAction } from 'mobx';
import config from '../config';
import rootStore from './AppStore';
import { parseError } from '../services/utils';
import { IEcolagePrive, IFraisDivers, IStudent } from '../common/interface/StudentInterface';
// import AppStore from './AppStore';



export interface StudentStoreInterface {
    allStudent: IStudent[];
    isCreate: boolean;
    isLoading: boolean;
    Student: IStudent | null;
    droit: IFraisDivers[];
    ecolagePrive: IEcolagePrive[];
    sumEcolagePrive: any;
    sumFraisDivers: any;
    setDroit: (data: IFraisDivers) => void;
    setEcolagePrive: (data: IEcolagePrive) => void;
    setSumEcolagePrive: (data: number) => void;
    setSumFraisDivers: (data: number) => void;
    setIsCreate: (data: boolean) => void;
    setStudent: (student: IStudent | null) => void;
    getAllStudent: () => Promise<any>;
    getListFraisDivers: () => Promise<any>;
    getListEcolage: () => Promise<any>;
    getFilteredStudent: (filter: Record<string, unknown>) => Promise<any>;
    createEcolagePrive: (data: any) => void;
    createFraisDivers: (data: any) => void;
    updateFilters: (name: "currentlyWorking", status: boolean) => void;
    filters: { currentlyWorking: boolean };
    createStudent: (data: IStudent) => void;
    updateStudent: (data: IStudent) => void;
    resetStudent: () => void;
    deleteTotalStudent: (data: IStudent) => void;
    deleteTotalEcolage: (data: IEcolagePrive) => void;
    deleteTotalFraisDivers: (data: IFraisDivers) => void;
    selectedStudent: IStudent | null;
    setSelectedStudent: (data: IStudent | null) => void;

}


class StudentStore implements StudentStoreInterface {

    @observable Student: IStudent | null = null;

    @observable selectedStudent: IStudent | null = null;

    @observable allStudent: IStudent[] = [];

    @observable droit: IFraisDivers[] = [];

    @observable ecolagePrive: IEcolagePrive[] = [];

    @observable isLoading = false;

    @observable isCreate = false;

    @observable sumEcolagePrive = 0;

    @observable sumFraisDivers = 0;

    @action resetStudent = () => {
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

    constructor() {
        makeObservable(this);
    }

    @action setSelectedStudent = (student: IStudent | null) => {
        this.selectedStudent = student;
    };

    @action setStudent = (s: IStudent | null) => {
        this.Student = s;
    };


    @action setIsCreate = (data: boolean) => {
        this.isCreate = data;
        if (data) {
            this.Student = null;
            this.droit = [];
            this.ecolagePrive = [];

        }
    };

    @action setDroit = (d: IFraisDivers) => {
        this.droit = [...this.droit, d];

    };

    @action setEcolagePrive = (ecolage: IEcolagePrive) => {
        this.ecolagePrive = [...this.ecolagePrive, ecolage];

    };

    @action setSumEcolagePrive = (data: number) => {
        this.sumEcolagePrive = data;
    };

    @action setSumFraisDivers = (data: number) => {
        this.sumFraisDivers = data;
    };

    @action updateFilters = (name: "currentlyWorking", status: boolean) => {

        if (status === true) {
            this.filters = { ...this.filters, [name]: status };
            this.getFilteredStudent({ filter: "" });

        }

    };

    @action getAllStudent = async () => {
        this.isLoading = true;
        try {
            const students = await axios.get(`${config.servers.apiUrl}student/`);
     
            this.allStudent = students.data;
            console.log("allStudent..",students.data);
            
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

    @action getListEcolage = async () => {
        this.isLoading = true;
        try {
            const ecolages = await axios.get(`${config.servers.apiUrl}student/getEcolage`);
            this.ecolagePrive = ecolages.data;
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

    @action getListFraisDivers = async () => {
        this.isLoading = true;
        try {
            const frais = await axios.get(`${config.servers.apiUrl}student/getFraisDivers`);
            this.droit = frais.data;
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

    @action createStudent = async (data: IStudent) => {
        try {

            const add = await axios.post(`${config.servers.apiUrl}student`, data);

            if (add.data.matriculNumber === 'MatriculNumber already exists') {
                rootStore.updateSnackBar(true, 'Numéro matricule existe déjà');

            } else {
                rootStore.succesSnackBar(true, 'Elève ajouter avec succès');

            }
            return add;

        } catch (err: any) {
            if (err.message.includes('code 400')) {
                rootStore.updateSnackBar(true, 'Le type ');
                return;
            }

            rootStore.updateSnackBar(true, "Une erreur s'est produite. Veuillez réessayer plus tard!");
        }
    };

    @action createEcolagePrive = async (data: any) => {
        try {
   
            const addEcolage = await axios.post(`${config.servers.apiUrl}student/ecolage`,
                data
            );


            if (addEcolage.data.student === 'lastName incorrect') {
                rootStore.updateSnackBar(true, 'Prénom incorrect !');

            } else {
                rootStore.succesSnackBar(true, 'Ecolage ajouter avec succès');

            }
            return addEcolage;

        } catch (err: any) {
            if (err.message.includes('code 400')) {
                rootStore.updateSnackBar(true, 'Le type ');
                return;
            }

            rootStore.updateSnackBar(true, "Une erreur s'est produite. Veuillez réessayer plus tard!");
        }
    };

    @action createFraisDivers = async (data: any) => {
        try {

            const addFraisDivers = await axios.post(`${config.servers.apiUrl}student/fraisDivers`, data);

            if (addFraisDivers.data.student === 'lastName incorrect') {
                rootStore.updateSnackBar(true, 'Prénom incorrect !');

            } else {
                rootStore.succesSnackBar(true, 'Frais Divers ajouter avec succès');

            }
            return addFraisDivers;

        } catch (err: any) {
            if (err.message.includes('code 400')) {
                rootStore.updateSnackBar(true, 'Le type ');
                return;
            }

            rootStore.updateSnackBar(true, "Une erreur s'est produite. Veuillez réessayer plus tard!");
        }
    };

    @action updateStudent = async (studentUpdate: IStudent) => {
        try {
            const student = await axios.patch(`${config.servers.apiUrl}student/edit`, studentUpdate);

            rootStore.updateSnackBar(true, 'Modifié', 'success');

            //   if (this.user?._id === userUpdate._id) {
            //     this.getUserInfo();
            //   }

            return student;
        } catch (err) {
            parseError(err, {
                404: "L'utilisateur demandé est introuvable",
                403: 'Vous ne pouvez pas effectuer cette opération ou le mot de passe entré est incorrect',
            });
        }
    };

    @action getFilteredStudent = async (filter: Record<string, unknown>) => {

        try {
            this.isLoading = true;
            const students = await axios.post(`${config.servers.apiUrl}student/filter`,
                {
                    filter,

                }
            );

            runInAction(() => {
                this.allStudent = students.data;
                this.isLoading = false;
            });
            // this.allUsers = users.data;
            // this.isLoading = false;

            return students.data;
        } catch (error) {
            parseError(
                error,
                "Une erreur s'est produite lors de la requête de vos infos. Veuillez réessayer"
            );
        } finally {
            this.isLoading = false;
        }
    };



    @action deleteTotalStudent = async (studentDelete: IStudent) => {
        try {

            const student = await axios.patch(`${config.servers.apiUrl}student/deleteTotal`, studentDelete);

            rootStore.updateSnackBar(true, 'Supprimé', 'success');
            return student;
        } catch (err) {
            parseError(err, {
                404: "L'utilisateur demandé est introuvable",
                403: 'Vous ne pouvez pas effectuer cette opération ou le mot de passe entré est incorrect',
            });
        }
    };


    @action deleteTotalEcolage = async (ecolageDelete: IEcolagePrive) => {
        try {

            const ecolage = await axios.patch(`${config.servers.apiUrl}student/deleteTotalEcolage`, ecolageDelete);

            rootStore.updateSnackBar(true, 'Supprimé', 'success');
            return ecolage;
        } catch (err) {
            parseError(err, {
                404: "L'utilisateur demandé est introuvable",
                403: 'Vous ne pouvez pas effectuer cette opération ou le mot de passe entré est incorrect',
            });
        }
    };

    @action deleteTotalFraisDivers = async (fraisDiversDelete: IFraisDivers) => {
        try {

            const fraisDivers = await axios.patch(`${config.servers.apiUrl}student/deleteTotalFraisDivers`, fraisDiversDelete);

            rootStore.updateSnackBar(true, 'Supprimé', 'success');
            return fraisDivers;
        } catch (err) {
            parseError(err, {
                404: "L'utilisateur demandé est introuvable",
                403: 'Vous ne pouvez pas effectuer cette opération ou le mot de passe entré est incorrect',
            });
        }
    };

}
export default new StudentStore();