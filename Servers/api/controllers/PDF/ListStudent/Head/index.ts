import { readFileSync } from 'fs';

interface IProps {
  schoolName: string;
  // firstname: string;
  // lastName: string;
  class: string;
  height: string;

}

const Head = (data: IProps, jsPdfPrint: any) => {

  const imagePath = __dirname.replace('controllers/PDF/ListStudent/Head','assets/images');
  const logo = readFileSync(`${imagePath}/logo.png`);


  jsPdfPrint.addImage(logo, 'PNG', 16, 10, 65, 25);


  jsPdfPrint.setFontSize(17);
  jsPdfPrint.setFont('Helvetica','bold');
  jsPdfPrint.text(135, 15, `${data?.schoolName}`);

  jsPdfPrint.setFontSize(10);
  jsPdfPrint.setFont('Helvetica','normal');
  jsPdfPrint.text(135, 20, `Niveau : ${data?.height}`);

  jsPdfPrint.setFontSize(10);
  jsPdfPrint.setFont('Helvetica','normal');
  jsPdfPrint.text(135, 24, `Classe : ${data?.class}`);

 
};

export default Head;
