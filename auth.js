const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const accessTokenSecret = 'youraccesstokensecret';

const users = [ 
	{
		username: 'John',
		password: 'password123admin',
		role: 'admin'
	},
	{
		username: 'Anna',
		password: 'password123member',
		role: 'member'
	},
	{
		username: 'Ben',
		password: 'password456member',
		role: 'member'
	},
];

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => { return u.username === username && u.password === password});

    if(user) {
        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret);
        res.json({
            accessToken
        });
    } else {
        res.send('Nome de usuário ou senha incorretos');
    }
});

app.listen(3000, () => {
	console.log('Serviço de autenticação iniciado na porta 3000');
});
