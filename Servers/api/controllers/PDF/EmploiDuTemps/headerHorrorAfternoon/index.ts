import getColumns from '../table.EmploiDuTemps';

const HeaderTableHorrorAfternoon= (y: number, jsPdfPrint: any,  list?: any) => {
  jsPdfPrint.rect(5, y, 20, 60); // empty square



  if (list[6] === '12h-13h') {
    jsPdfPrint.setFontSize(8);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 135, `${list[6]}`);
  }
  if (list[7] === '13h-14h') {
    jsPdfPrint.setFontSize(8);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 145, `${list[7]}`);
  }
  if (list[8] === '14h-15h') {
    jsPdfPrint.setFontSize(8);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 155, `${list[8]}`);
  }
  if (list[9] === '15h-16h') {
    jsPdfPrint.setFontSize(8);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 165, `${list[9]}`);

  }
  if (list[10] === '16h-17h') {
    jsPdfPrint.setFontSize(8);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 175, `${list[10]}`);
  }
  if (list[11] === '17h-18h') {
    jsPdfPrint.setFontSize(8);
    jsPdfPrint.setFont('Helvetica', 'bold');
    jsPdfPrint.text(6, 185, `${list[11]}`);
  }


};

export { HeaderTableHorrorAfternoon };
