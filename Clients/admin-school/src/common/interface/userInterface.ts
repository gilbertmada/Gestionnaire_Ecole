export interface IUser {
    _id?: string;
    lastName: string;
    firstName: string;
    email: string;
    username: string;
    role: string;
    nomRole:string;
    password: string;
    deleted: boolean;
    date: Date;
    photo: string;
    categorie: string;
    urlPlus?: string;
    isArchive: boolean;
  }
  