import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { TokenPayload } from "../common/types/token";

dotenv.config();

export const authMiddleware = (
    req: Request & { user?: TokenPayload },
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};
