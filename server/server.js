const express = require("express");
const cors = require('cors');
const routes = require('./routes');
const app = express();

const PORT = 4050;

app.use(cors());
app.use(express.json());
app.use(express.static('www'));

// Carrega as rotas da API
routes(app);

app.listen(PORT, function () {
  console.log(`Plataforma Comunicação Server listening on port ${PORT}!`);
});