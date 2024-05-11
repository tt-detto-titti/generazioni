const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Mi connetto al database
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    dbName: db.name,
    user: db.user,
    pass: db.pass,
  })
  .then(() => {
    console.log("Connesso al database.");
  })
  .catch((err) => {
    console.error("Connessione al database fallita: " + err.message);
    process.exit();
  });

// Carico le routes
require("./app/routes/auth.routes.js")(app);
require("./app/routes/utente.routes.js")(app);
require("./app/routes/richiesta.routes.js")(app);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Il server è in ascolto sulla porta ${PORT}.`);
});
