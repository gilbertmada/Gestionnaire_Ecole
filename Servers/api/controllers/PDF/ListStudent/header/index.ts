import getColumns from '../table.Column';

const HeaderTable = (y: number, jsPdfPrint: any, nextTable?: boolean) => {
  jsPdfPrint.rect(5, y, 200, 10); // empty square

  if (!nextTable) {
    jsPdfPrint.setFontSize(15);
    jsPdfPrint.setTextColor(0, 0, 0);
    jsPdfPrint.setFont('helvetica');
    jsPdfPrint.text(80, y - 2, `LISTES DES ELEVES`);
  }

  const width = 200 / getColumns.length;
  let incrementWidth = 8;

  for (let i = 0; i < getColumns.length; i++) {
    jsPdfPrint.setFontSize(8);
    jsPdfPrint.setTextColor(0, 0, 0);
    jsPdfPrint.setFont('helvetica');
    jsPdfPrint.text(incrementWidth, y + 6, getColumns[i].headerName);

    incrementWidth += width;
  }
};

export { HeaderTable };
