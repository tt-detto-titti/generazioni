const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = __dirname + "/../frontend/dist";

app.use(express.static(path));

var corsOptions = {
  origin: process.env.CORS_ORIGIN,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connessione al database
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

app.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});

// Carica le routes
require("./app/routes/auth.routes.js")(app);
require("./app/routes/utente.routes.js")(app);
require("./app/routes/richiesta.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Il server è in ascolto sulla porta ${PORT}.`);
});
