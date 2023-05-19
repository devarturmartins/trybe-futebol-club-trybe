import { sign, Secret } from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import Users from '../database/models/Users';

interface LoginData {
  email: string;
  password: string;
}

const secret: Secret = process.env.JWT_SECRET as Secret;

export default class LoginService {
  public static async login(loginData: LoginData): Promise<string> {
    const { email, password } = loginData;

    if (!email || !password) throw new Error('All fields must be filled');

    const user = await Users.findOne({ where: { email } });

    if (!user) throw new Error('Incorrect username or password');

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) throw new Error('Incorrect username or password');

    const token = sign({
      data: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    }, secret, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });
    return token;
  }
}
