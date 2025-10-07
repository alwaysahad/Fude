import { NextFunction, Request, Response } from "express"
import dotenv from 'dotenv'
import jwt, { JwtPayload } from "jsonwebtoken"

export function middleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'] ?? ""

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload

    if (decoded) {
        req.userId = decoded.userId;
        next();

    } else {
        res.status(403).json({
            "message": "Unauthorized"
        })
    }
}