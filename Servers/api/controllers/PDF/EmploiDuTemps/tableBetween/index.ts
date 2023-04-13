import getColumns from '../table.EmploiDuTemps';

const TableBetween = (y: number, jsPdfPrint: any,) => {
  jsPdfPrint.rect(5, y, 280, 10); // empty square


    jsPdfPrint.setFontSize(10);
    jsPdfPrint.setTextColor(0, 0, 0);
    jsPdfPrint.setFont('bold');
    jsPdfPrint.text(138, y + 6, 'APRES MIDI');

};

export { TableBetween };
