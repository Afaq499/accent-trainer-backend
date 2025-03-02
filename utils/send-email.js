import nodemailer from 'nodemailer';

export const sendEmail = async (email, subject, bodyPart) => {

  const {
    NODE_MAILER_SENDER: user,
    NODE_MAILER_PASSWORD: pass,
    NODE_MAILER_HOST: host,
    MAIL_PORT: port
  } = process.env;
  const transporter = nodemailer.createTransport({
    host,
    // secure: true,
    port,
    auth: {
      user,
      pass
    }
  });

  try {
    await transporter.sendMail({
      from: user,
      to: email,
      subject,
      html: bodyPart
    });
  } catch (err) {
  }

};
