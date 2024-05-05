const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GenerAzioni API",
      version: "1.0.0",
      description: "Queste sono le API del progetto GenerAzioni.",
    },
  },
  apis: ["./app/routes/*.js"], // files containing annotations as above
};
const swaggerDocument = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connesso al database.");
  })
  .catch((err) => {
    console.log("Connessione al database fallita: " + err.message);
    process.exit();
  });

require("./app/routes/richiesta.routes.js")(app);
require("./app/routes/utente.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
