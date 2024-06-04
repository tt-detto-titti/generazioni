const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  pool: true,
  host: "smtp.libero.it",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: process.env.LIBERO_USER,
    pass: process.env.LIBERO_PASS
  },
});

const mailOptions = {
  from: '"Admin GenerAzioni" <admin.generazioni@libero.it>',
  to: "tommitamagnini@gmail.com", // lista dei destinatari
  subject: "Oggetto dell'email", // oggetto dell'email
  text: "Questo è il contenuto dell'email in formato testo", // corpo dell'email in formato testo
  html: "<b>Questo è il contenuto dell'email in formato HTML</b>", // corpo dell'email in formato HTML
};

const invia = () => {
  // Invia l'email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Errore durante l'invio dell'email: ", error);
    }
    console.log("Email inviata: ", info.response);
  });
};

const EmailService = {
  invia,
};

module.exports = EmailService;
