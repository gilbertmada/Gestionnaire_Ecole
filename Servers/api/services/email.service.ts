import nodemailer from "nodemailer";
import config from "config";

const mailerConfig: {
  host: string;
  email: string;
  password: string;
  port: number;
} = config.get("mailer");

const logoUrl = `${config.get("logoUrl")}`;

const transporter = nodemailer.createTransport({
  port: mailerConfig.port,
  host: mailerConfig.host,
  auth: {
    user: mailerConfig.email, // generated ethereal user
    pass: mailerConfig.password, // generated ethereal password
  },
});

export const sendMail = (
  to: string,
  subject: string,
  message: string,
  attachments?: {
    filename?: string;
    content?: string;
    contentType?: string;
    path: string;
  }[]
) => {
  const mailOptions = {
    from: mailerConfig.email,
    to,
    subject,
    attachments,
    html: `<div>
          <center>
              <img 
                  src=${logoUrl}
                  alt="Logo" 
                  width="80" 
                  height="50"  
                  
                  />
          </center>
          ${message}
          <h3>SCHOOL</h3>
      </div>`,
  };

  return transporter.sendMail(mailOptions);
};
