
const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

const months = [
  "Janvier",
  "Fevrier",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decemnbre",
];

const usersRoles = [
  {
    code: "ADMIN",
    label: "Administrateur",
    access: ["all modules", "back office"],
  },
  {
    code: "PROV",
    label: "Proviseur",
    access: ["all modules", "back office"],
  },
  {
    code: "PA",
    label: "Proviseur-Adjoint",
    access: ["all modules", "back office"],
  },
  {
    code: "DIR",
    label: "Directeur",
    access: ["all modules", "back office"],
  },
  {
    code: "DIRC",
    label: "Directrice",
    access: ["all modules", "back office"],
  },
  { code: "SURV", label: "Survaillant", access: ["all modules"] },
  { code: "SURVE", label: "Survaillante", access: ["all modules"] },

];

const  profHorror = [
  {
    code: "6H",
    label: "6h-7h",
  },
  {
    code: "7H",
    label: "7h-8h",
  },
  {
    code: "8H",
    label: "8h-9h",
  },
  {
    code: "9H",
    label: "9h-10h",
  },
  {
    code: "10H",
    label: "10h-11h",
  },
  {
    code: "11H",
    label: "11h-12h",
  },
  {
    code: "12H",
    label: "12h-13h",
  },
  {
    code: "13H",
    label: "13h-14h",
  },
  {
    code: "14H",
    label: "14h-15h",
  },
  {
    code: "15H",
    label: "15h-16h",
  },
  {
    code: "16H",
    label: "16h-17h",
  },
  {
    code: "17H",
    label: "17h-18h",
  },
]

const  profDay = [
  {
    code: "MON",
    label: "Lundi",
  },
  {
    code: "TUE",
    label: "Mardi",
  },
  {
    code: "WED",
    label: "Mercredi",
  },
  {
    code: "THU",
    label: "Jeudi",
  },
  {
    code: "FRI",
    label: "Vendredi",
  },
  {
    code: "SAT",
    label: "Samedi",
  },
]

const profRoles = [
  {
    code: "PROF",
    label: "Professeur",
  },
  {
    code: "INST",
    label: "Instituteur",
  },
  {
    code: "INST",
    label: "Institutrice",
  },
  {
    code: "MAIT",
    label: "Maître",
  },
  {
    code: "MAIT",
    label: "Maîtresse",
  },
]
const matieres = ["Malagasy", "Philosophie", "Français", "Anglais", "Science-Eco-Social", "Mathématiques", "PC", "SVT", "Histo-Géo"];

const allUsers = ["ADMIN", "DIR", "PROV", "SURV", "ELEV", "PROF"];

const admins = ["ADMIN", "DIR", "PROV", "PA", "SURV"];

const utilisateurPermission = ["ADMIN", "DIR", "PROV", "PA", "SURV"];

const formatAmountToFr = (data: any) => {
  return `${new Intl.NumberFormat("de-DE").format(+data)} Ar`;
};

export {
  admins,
  usersRoles,
};

export {
  profRoles,
};

export {
  allUsers,
};

export {
  months,
};

export {
  days,
  profDay,
  profHorror
};

export {
  utilisateurPermission,
};

export {
  matieres,
};

export {
  formatAmountToFr,
};