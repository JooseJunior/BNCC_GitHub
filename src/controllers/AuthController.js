import jwt from 'jsonwebtoken';
import { promisify } from 'util';
// import PermissaoMiddleware from '../middlewares/PermissaoMiddleware';

class AuthController {
  static async authorization(req, res) {
    try {
      const auth = req.headers.authorization;
      if (!auth) {
        return res.status(498).json([{ code: 498, message: "Token de autenticação não recebido na rota!" }])
      }
      const [, token] = auth.split(' '); // desestruturação
      // promisify converte uma função de callback para uma função async/await
      const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
      if (!decoded) { // se não ocorrer a decodificação do token
        return res.status(498).json([{ error: true, code: 498, message: "O token está expirado!" }])
      } else { // se o token for válido
        req.user_id = decoded.id;
        // retornar o id do usuário em req.user_id
        return res.status(200).json({code: 200, message: "Token válido!", user_id: req.user_id })
      }
    } catch { // se o token não for válido
      return res.status(498).json([{ error: true, code: 498, message: "O token está inválido!" }])
    }
  }

}

export default AuthController;
