export interface IProfessor {
    _id?: string;
    lastName: string;
    firstName: string;
    email: string;
    role: string;
    nomRole:string;
    password: string;
    IM: string;
    matiere: string;
    // deleted: boolean;
    date:  Date | string;
    photo: string;
    // urlPlus?: string;
    // isArchive: boolean;
  }
  