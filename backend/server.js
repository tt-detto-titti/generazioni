const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN
};
app.use(cors(corsOptions));

// Interpreta i dati JSON nelle richieste HTTP
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./models');
db.mongoose
  .connect(db.url, {
    dbName: db.name,
    user: db.user,
    pass: db.pass
  })
  .then(() => {
    console.log('Connesso al database.');
  })
  .catch((err) => {
    console.error('Connessione al database fallita: ' + err.message);
    process.exit();
  });

// Serve il frontend
const path = __dirname + '/../frontend/dist/';
app.use(express.static(path));
app.get('/', function (req, res) {
  res.sendFile(path + 'index.html');
});

require('./routes/auth.routes.js')(app);
require('./routes/richiesta.routes.js')(app);
require('./routes/offerta.routes.js')(app);
require('./routes/feedback.routes.js')(app);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Qualcosa è andato storto!' });
});

module.exports = app;
