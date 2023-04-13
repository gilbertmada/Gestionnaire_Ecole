import moment from 'moment';
import { readFileSync } from 'fs'

interface IProps {
 
    lastName:string,
    datePayEcolage:string,
    matriculNumber:string,
    ecolageMonth:string,
    ecolage:string
}

const Head = (data: IProps, jsPdfPrint: any) => {

  jsPdfPrint.setFontSize(8);
  jsPdfPrint.setFont('Helvetica','bold');
  jsPdfPrint.text(40, 60, '.....................    REÇU DE DROIT   .....................');


  jsPdfPrint.rect(14, 62, 120, 60);

  jsPdfPrint.setFontSize(8);
  jsPdfPrint.setFont('Helvetica','bold');
  jsPdfPrint.text(16, 74, 'Prénom : ');
  jsPdfPrint.text(16, 84, 'Numéro matricule : ');
  jsPdfPrint.text(16, 94, 'Date de payement : ');
  jsPdfPrint.text(16, 104, 'Mois : ');
  jsPdfPrint.text(16, 114, 'Ecolage : ');

  jsPdfPrint.setFontSize(8);
  jsPdfPrint.setFont('Helvetica','normal');
  jsPdfPrint.text(44, 74, `...........................   ${data?.lastName}   `);
  jsPdfPrint.text(44, 84, `...........................   ${data?.matriculNumber}   `);
  jsPdfPrint.text(44, 94, `...........................   ${data?.datePayEcolage}    `);
  jsPdfPrint.text(44, 104,`...........................    ${data?.ecolageMonth}    `);
  jsPdfPrint.text(44, 114,`...........................    ${data?.ecolage} Ar `);

};

export default Head;
