import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import routes from './src/routes/Routes.js'

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

// Rota para autenticação
router.post('/api/authenticate', (req, res) => {
    const { username, password } = req.body;

    // Aqui você deve verificar as credenciais do usuário
    // Se as credenciais estiverem corretas, crie um token JWT
    if (username === 'usuario' && password === 'senha') {
        const token = jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }
});

app.use(router, routes);

// Proteja as rotas com JWT
//app.use(expressJwt.default({ secret: jwtSecret, algorithms: ['HS256'] }).unless({ path: ['/api/authenticate'] }));

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
    const date = new Date();
    console.log('Api running - Porta:' + PORT, date);
});