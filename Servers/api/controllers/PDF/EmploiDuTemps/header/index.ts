import getColumns from '../table.EmploiDuTemps';

const HeaderTableEmploiDuTemps = (y: number, jsPdfPrint: any, nextTable?: boolean) => {
  jsPdfPrint.rect(25, y, 260, 10); // empty square

  if (!nextTable) {
    jsPdfPrint.setFontSize(15);
    jsPdfPrint.setTextColor(0, 0, 0);
    jsPdfPrint.setFont('helvetica');
    jsPdfPrint.text(120, y - 2, `EMPLOI DU TEMPS`);
  }

  const width = 260 / getColumns.length;
  let incrementWidth = 43.33;

  for (let i = 0; i < getColumns.length; i++) {
    jsPdfPrint.setFontSize(10);
    jsPdfPrint.setTextColor(0, 0, 0);
    jsPdfPrint.setFont('helvetica');
    jsPdfPrint.text(incrementWidth, y + 6, getColumns[i].headerName);

    incrementWidth += width;
  }
};

export { HeaderTableEmploiDuTemps };
