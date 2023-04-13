export interface IStudent {
  _id?: string;
  schoolName: string;
  lastName: string;
  firstName: string;
  height: string;
  matriculNumber: string;
  inscriptionDroit: string;
  class: string;
  address: string;
  deleted: boolean;
  date: Date;
  photo: string;
  urlPlus?: string;
  isPrive: boolean;
  isEtat: boolean;
}

export interface IFraisDivers {
  id: number;
  student: string;
  matriculNumber: string;
  frais: string;
  datePayDivers: Date | string;
  isFrais: boolean;
}

export interface IEcolagePrive {
  id: number;
  student: any;
  matriculNumber: string;
  ecolage: string;
  datePayEcolage: Date | string;
  ecolageMonth:string;
  isEcolage: boolean;
}