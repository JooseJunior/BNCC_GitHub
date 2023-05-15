import User from '../models/Usuario.js';
import grupos from '../models/Grupo.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class LoginController {

  static logar = async (req, res) => {
    const { email, senha } = req.body;

    const userExist = await User.findOne({ email }).select('+senha');

    // se o usuário não existir
    if (!userExist || !await bcrypt.compare(senha, userExist.senha)) {
      return res.status(400).json([{ code: 400, message: "Usuário ou Senha inválida!" }])
    }

    // se o usuário não estiver ativo
    if (!userExist.ativo) {
      return res.status(400).json([{ code: 400, message: "Usuário inativo!" }])
    }

    let user = JSON.parse(JSON.stringify(userExist));
    user.grupos = await grupos.find({ _id: { $in: user.grupos } }).lean();
    for (let i = 0; i < user.grupos.length; i++) {
      user.grupos[i].unidades = await unidades.find({ _id: { $in: user.grupos[i].unidades } }).lean();
    }

    return res.status(200).json({
      user: {
        id: userExist._id,
        nome: userExist.nome,
        email: userExist.email,
        ativo: userExist.ativo,
        rotas: userExist.rotas,
        grupos: user.grupos
      },
      token: jwt.sign(
        {
          id: userExist._id,
          nome: userExist.nome,
          email: userExist.email,
          ativo: userExist.ativo
        },
        process.env.SECRET,
        { expiresIn: process.env.EXPIREIN }
      )
    })
  }
}

export default LoginController;
