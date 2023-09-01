import { Router, Request, Response } from 'express';
import JWTAuthorization from '../auth/JWTAuthorization';

export default class GenerateTokenRoute {
  constructor(private auth: JWTAuthorization) {}

  public route() {
    const router = Router();
    router.post('/', this.generate);
    return router;
  }

  private generate = (req: Request, res: Response) => {
    const userId = 1; // Normally authenticate the user and get their userId
    const token = this.auth.generate(userId);
    res.json({ token });
  };
}


