import moment from 'moment';
import { HeaderTableEmploiDuTemps } from '../header';
import getColumns from '../table.EmploiDuTemps';

const value = (list: any, field: any) => {

  if (list[field]) {

    if (field === 'prof' && +list[field] !== undefined) {
      return `${list[field].matiere}\n${list[field].lastName}`;
    }

    return list[field] || "";

  }

  return '';
};

const valueX = (list: any, nomDay: any) => {

  let x = 0;


  if (list.nomDay === "Lundi") {
    x += 43.33;
  } else if (list.nomDay === "Mardi") {
    x += 86.66;
  } else if (list.nomDay === "Mercredi") {
    x += 129.99;
  }
  else if (list.nomDay === "Jeudi") {
    x += 173.32;
  } else if (list.nomDay === "Vendredi") {
    x += 216.65;
  } else if (list.nomDay === "Samedi") {
    x += 259.98;
  }

  return x;
}

const valueY = (list: any, nomHorror: any) => {
  let y = 55;


  if (list.nomHorror === "6h-7h") {
    y += 10;
  } else if (list.nomHorror === "7h-8h") {
    y += 20;
  }
  else if (list.nomHorror === "8h-9h") {
    y += 30;
  }
  else if (list.nomHorror === "9h-10h") {
    y += 40;
  } else if (list.nomHorror === "10h-11h") {
    y += 50;
  } else if (list.nomHorror === "11h-12h") {
    y += 60;
  }
  if (list.nomHorror === "12h-13h") {
    y += 80;
  } else if (list.nomHorror === "13h-14h") {
    y += 90;
  } else if (list.nomHorror === "15h-16h") {
    y += 100;
  }
  else if (list.nomHorror === "16h-17h") {
    y += 110;
  } else if (list.nomHorror === "17h-18h") {
    y += 120;
  }

  return y;
}

const TableEmploiDuTemps = (list: any[] | [], jsPdfPrint: any) => {


  const nbrPage = Math.ceil(list.length / 22.5);
 

  for (let a = 1; a < list.length; a++) {
    for (let i = 1; i < getColumns.length; i++) {

      jsPdfPrint.setFontSize(8);
      jsPdfPrint.setTextColor(0, 0, 0);
      jsPdfPrint.setFont('helvetica');
      jsPdfPrint.text(
        +valueX(list[a],list[a].nomDay),
        +valueY(list[a],list[a].nomHorror),
        `${value(list[a], getColumns[i].field as any)}`
      );

    
    }


  }
};

export { TableEmploiDuTemps };
