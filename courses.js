const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.listen(4000, () => {
    console.log('O serviço de cursos foi iniciado na porta 4000.')
})