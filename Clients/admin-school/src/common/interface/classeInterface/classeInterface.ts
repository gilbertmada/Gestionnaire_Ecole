import { IProfessor } from './professorClasse';

export interface IClasse {
    _id: string;
    schoolName: string;
    className: string;
    horror: string;
    nomHorror:string,
    nomDay:string,
    day: string;
    prof:  IProfessor ;
    deleted: boolean;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    urlPlus?: string;
}
  
  