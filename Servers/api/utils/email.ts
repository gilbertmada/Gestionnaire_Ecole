import nodemailer from "nodemailer";
import config from "config";
const logoUrl = `${config.get("logoUrl")}`;

const mailerConfig:{
  host: string;
  email: string;
  password: string;
  port: number;
} = config.get('mailer');

const transporter = nodemailer.createTransport({
  port: mailerConfig.port,
  host: mailerConfig.host,
  auth: {
      user: mailerConfig.email, // generated ethereal user
      pass: mailerConfig.password, // generated ethereal password
  },
});

export const sendPasswordReinitMail = (email: string, name: string, token: string, code: string) => {
  const mailOptions = {
    from: mailerConfig.email,
    to: email,
    subject: `Réinitialisation de votre mot de passe`,
    html: `<div>
        <center>
            <img 
                src=${logoUrl}
                alt="Logo" 
                width="80" 
                height="50"  
                
                />
        </center>
        <p>
            Bonjour <b>${name}</b>,
        </p>
        <p>
            Vous avez demandé la réinitialisation de votre mot de passe sur la plateforme SCHOOL_GESTION.
        </p>
        <p>
          Vous pouvez suivre <a href='https://new.clicar.fr/changePassword/${token}' style='
                background-color: #4CAF50; 
                border: none;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
            '>ce lien</a> pour effectuer la réinitialisation.
        </p>
        <p>Si vous êtes sur l'application mobile le code est: <strong>${code}</strong> </p>
        <h3>SCHOOL_GESTION</h3>
    </div>`
  
  };
  
  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log('send mail error', error);
      throw error;
    } 
  });
  return true;
}



export const sendPasswordToClient = (email: string, name: string, code: string) => {

  const mailOptions = {
    from: mailerConfig.email,
    to: email,
    subject: `Votre mot de passe espace client`,
    html: `<div>
        <center>
            <img 
                src=${logoUrl}
                alt="Logo" 
                width="80" 
                height="50"  
                
                />
        </center>
        <p>Bonjour <b>${name}</b>,</p>
        <p>Bienvenue sur l’application SCHOOL_GESTION.</p>
        <p>Votre mot de passe initial est le: <strong>${code}</strong> </p>
        <p>Dès que vous avez reçu ce mail, veuillez procéder au changement de votre mot de passe.</p>
        <p>Cordialement</p>
        <h3>SCHOOL_GESTION</h3>
    </div>`
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {

    if (error) {
      throw error;
    } 
    else{
      return true;
    }
  });
  return true;
}
 