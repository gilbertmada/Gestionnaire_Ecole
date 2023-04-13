import moment from 'moment';
import { readFileSync } from 'fs'

interface IProps {
 
    firstName:string,
    lastName:string,
    address:string,
    inscriptionDroit:string,
}

const Head = (data: IProps, jsPdfPrint: any) => {

  jsPdfPrint.setFontSize(8);
  jsPdfPrint.setFont('Helvetica','bold');
  jsPdfPrint.text(40, 60, '.....................    REÇU DE DROIT   .....................');


  jsPdfPrint.rect(14, 62, 120, 50);

  jsPdfPrint.setFontSize(8);
  jsPdfPrint.setFont('Helvetica','bold');
  jsPdfPrint.text(16, 74, 'Nom : ');
  jsPdfPrint.text(16, 84, 'Prénom : ');
  jsPdfPrint.text(16, 94, 'Addresse : ');
  jsPdfPrint.text(16, 104, 'Droit : ');

  jsPdfPrint.setFontSize(8);
  jsPdfPrint.setFont('Helvetica','normal');
  jsPdfPrint.text(40, 74, `...............................   ${data?.firstName}   `);
  jsPdfPrint.text(40, 84, `...............................   ${data?.lastName}    `);
  jsPdfPrint.text(40, 94, `...............................    ${data?.address}    `);
  jsPdfPrint.text(40, 104, `...............................    ${data?.inscriptionDroit} Ar `);

};

export default Head;
