const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const accessTokenSecret = 'youraccesstokensecret';

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if(err){
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.listen(4000, () => {
    console.log('O serviço de cursos foi iniciado na porta 4000.')
})

app.get('/courses', authenticateJWT, (req, res) => {
    res.json(courses);
});

app.post('/courses', authenticateJWT, (req, res) => {
    const { role } = req.user;
    if( role !== 'admin') {
        return res.sendStatus(403);
    }

    const course = req.body;
    courses.push(course);
    res.send('Curso adicionado com sucesso!');
});

const courses = [
    {
        "name": "Análise e Desenvolvimento de Sistemas",
        "description": "Curso superior de ADS",
        "type": "Superior",
        "year": 2010
    },
    {
        "name": "Técnico em Informática para Internet",
        "description": "Curso técnico de informática",
        "type": "Técnico",
        "year": 2014
    },
    {
        "name": "Bacharelado em Agronomia",
        "description": "Curso de Agronomia",
        "type": "Superior",
        "year": 2016
    }
];