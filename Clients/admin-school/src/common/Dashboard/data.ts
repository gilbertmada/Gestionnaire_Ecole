
import Users from '../../Assets/dashboard/CLICAR-user-20.svg';
import eleve from '../../Assets/dashboard/eleves.png';
import professor from '../../Assets/dashboard/professor.png';
import classe from '../../Assets/dashboard/classe.png';
import rootStore from '../../store/AppStore';
import { inject, observer } from 'mobx-react';
import {
  // accsAndComs,
  admins,
  // comAndFacts,
  utilisateurPermission,

} from '../utils/data';
import { userStore } from '../../store';


export interface Idashboard {
  titre: string;
  link: string;
  nbr: number;
  images: any;
  permissions?: string[];
}


const rowData = (): Idashboard[] => [
  {
    titre: 'UTILISATEUR',
    link: '/user/list',
    nbr: rootStore.numbers.usersNumber,
    images: Users,
    permissions: utilisateurPermission,
  },
  {
    titre: 'ELEVES',
    link: '/student/list',
    nbr: rootStore.numbers.studentNumber,
    images: eleve,
    permissions: utilisateurPermission,
  },
  {
    titre: 'ENSEIGNANTS',
    link: '/professor/list',
    nbr: rootStore.numbers.professorNumber,
    images: professor,
    permissions: utilisateurPermission,
  },

  {
    titre: 'CLASSES',
    link: '/class/list',
    nbr: rootStore.numbers.classNumber,
    images: classe,
    permissions: utilisateurPermission,
  },
  // {
  //   titre: 'TEST',
  //   link: '/test',
  //   nbr: 0,
  //   images: test,
  //   permissions: admins,
  // },

];

export default rowData;

