const app = require('./backend/server.js');
const db = require('./backend/models');

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Il server è in ascolto sulla porta ${PORT}.`);
});
