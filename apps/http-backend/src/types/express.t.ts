import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    export interface Request {
      userId?: string; 
      user?: JwtPayload | string;
    }
  }
}
