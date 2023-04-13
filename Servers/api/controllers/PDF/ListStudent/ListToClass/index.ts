import moment from 'moment';
import { HeaderTable } from '../header';
import getColumns from '../table.Column';

const value = (list: any, field: any) => {
  if (list[field]) {
    if (
      (field === 'firstName' ||
        field === 'lastName' ||
        field === 'matriculNumber' ||
        field === 'height' ||
        field === 'class' ||
        field === 'address') &&
      +list[field] !== undefined
    ) {
      return `${list[field]} `;
    }

    return list[field];
  }

  return '';
};

const ListToClass = (list: any[] | [], jsPdfPrint: any) => {
  const width = 200 / getColumns.length;

  let incrementWidth = 8;

  let incrementHeight = 65;

  let nbrInterval = 20;

  let pageCurrent = 1;

  const nbrPage = Math.ceil(list.length / 22.5);

  for (let a = 0; a < list.length; a++) {
    for (let i = 0; i < getColumns.length; i++) {
      jsPdfPrint.setFontSize(8);
      jsPdfPrint.setTextColor(0, 0, 0);
      jsPdfPrint.setFont('helvetica');
      jsPdfPrint.text(
        incrementWidth,
        incrementHeight,
        `${value(list[a], getColumns[i].field as any)}`
      );
      incrementWidth += width;
    }

    incrementWidth = 8;
    incrementHeight += 10;

  
    if (a === nbrInterval) {
      jsPdfPrint.addPage();
      HeaderTable(15, jsPdfPrint, true);
      incrementHeight = 30;
      nbrInterval += 25;
      pageCurrent++;
 
    }
  
    jsPdfPrint.text(190, 285, `Page ${pageCurrent}`);
  }
};

export { ListToClass };
