import jwt from 'jsonwebtoken';
import { IAuthorization } from '../interfaces/interface'

export default class JWTAuthorization implements IAuthorization {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor(secret: string, expiresIn: string) {
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  authorize(req: any): boolean {
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const payload = this.verify(token);
      return !!payload;
    }
    return false;
  }

  generate(userId: string | number): string {
    return jwt.sign({ id: userId }, this.secret, {
      expiresIn: this.expiresIn,
    });
  }

  verify(token: string): string | null {
    try {
      return jwt.verify(token, this.secret) as string;
    } catch (e) {
      return null;
    }
  }
}