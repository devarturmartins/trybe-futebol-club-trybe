import { sign, Secret } from 'jsonwebtoken';
// import * as bcrypt from 'bcryptjs';
import Users from '../database/models/Users';

interface LoginData {
  email: string;
  password: string;
}

const secret: Secret = process.env.JWT_SECRET as Secret;
const jwtConfig: object = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

export default class LoginService {
  public static async login(loginData: LoginData): Promise<string> {
    console.log('service');
    const { email } = loginData;
    const user: Users | null = await Users.findOne({ where: { email } }) as Users;
    const token = sign({
      data: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    }, secret, jwtConfig);
    return token;
  }

  public static async role(email: string): Promise<string> {
    const data = await Users.findOne({ where: { email } });

    if (!data) {
      return 'Invalid email or password';
    }

    const { role } = data.dataValues;
    return role;
  }
}
