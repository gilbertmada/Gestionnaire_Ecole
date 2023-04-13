import getColumns from '../table.EmploiDuTemps';

const HeaderTableHorrorMorning = (y: number, jsPdfPrint: any, nextTable?: boolean, list?: any) => {
  jsPdfPrint.rect(5, y, 20, 60); // empty square

  if (!nextTable) {
    jsPdfPrint.setFontSize(10);
    jsPdfPrint.setTextColor(0, 0, 0);
    jsPdfPrint.setFont('helvetica','bold');
    jsPdfPrint.text(6, y - 3, `Horaires`);
  }


  if (list[0] === '6h-7h') {
    jsPdfPrint.setFontSize(8);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 65, `${list[0]}`);
  }
  if (list[1] === '7h-8h') {
    jsPdfPrint.setFontSize(8);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 75, `${list[1]}`);
  }
  if (list[2] === '8h-9h') {
    jsPdfPrint.setFontSize(8);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 85, `${list[2]}`);
  }
  if (list[3] === '9h-10h') {
    jsPdfPrint.setFontSize(8);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 95, `${list[3]}`);

  }
  if (list[4] === '10h-11h') {
    jsPdfPrint.setFontSize(8);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 105, `${list[4]}`);
  }
  if (list[5] === '11h-12h') {
    jsPdfPrint.setFontSize(8);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 115, `${list[5]}`);
  }


};

export { HeaderTableHorrorMorning };
