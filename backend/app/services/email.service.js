const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  pool: true,
  host: 'smtp.libero.it',
  port: 465,
  secure: true,
  auth: {
    user: process.env.LIBERO_USER,
    pass: process.env.LIBERO_PASS
  }
});
const options = {
  from: '"Admin GenerAzioni" <admin.generazioni@libero.it>',
  to: '',
  subject: '',
  text: '', // Corpo dell'email in formato testo semplice
  html: '' // Corpo dell'email in formato HTML
};

const inviaNotificaMatch = (email, richieste) => {
  let richiesteHTML = ``;
  richieste.forEach((richiesta) => {
    richiesteHTML += `<li><strong>${new Date(richiesta.data).toLocaleDateString()} ${new Date(richiesta.data).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>: ${richiesta.categoria}</li>`;
  });

  options.to = email;
  options.subject = 'Una persona ha bisogno di te!';
  options.text = `
  Abbiamo trovato una corrispondenza con la tua disponibilità di aiuto! 
  Vai su GenerAzioni per visualizzare la richiesta ed eventualmente accettarla.
  Grazie!`;
  options.html = `
  <h2>Hey! :)</h2>
  <p>Abbiamo trovato una <strong>corrispondenza</strong> con la tua disponibilità di aiuto!</p>
  <p>Vai su <a href="https://generazioni.onrender.com/">GenerAzioni</a> per visualizzare la richiesta ed eventualmente accettarla.</p>
  <ul>${richiesteHTML}</ul>
  <p>Grazie!</p>
  <br/>
  <em>Il Team Gener<strong>Azioni</strong></em>`;

  invia(options);
};

const invia = (mailOptions) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Errore durante l'invio dell'email: ", error);
    }
    console.log('Email inviata: ', info.response);
  });
};

const EmailService = {
  inviaNotificaMatch
};

module.exports = EmailService;
