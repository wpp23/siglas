import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

// Configurando o dotenv
dotenv.config();

const secretAPI = process.env.SECRETAPI

export default class AuthController {    
    
    static async login(req, res) {
        try {

            const iduser = req.body.iduser||10;
            const token = jwt.sign({iduser: iduser}, secretAPI, {expiresIn: '1h'});

            res.status(200).json({iduser: iduser, token: token});

        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    static async checkToken(req, res, next) {
        try {
          const authHeader = req.headers.authorization; // Recupera o Header da requisição
          const token = authHeader && authHeader.split(' ')[1];
      
          //console.log(token);
          if (!token) {
            return res.status(401).json({ error: 'Acesso negado' });
          }
      
          // Verifica o token
          const decoded = jwt.verify(token, secretAPI); 
          req.iduser = decoded.iduser; 
      
          next(); // Tudo certo, avança para a próxima função.
      
        } catch (error) {
          return res.status(400).json({ error: 'Token inválido' });
        }
      }
      

}