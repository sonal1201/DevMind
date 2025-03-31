import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_PASSWORD } from "../config/config";

interface AuthenticatedRequest extends Request {
    userId?: string;
  }

export const userMiddlerware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    try {
        const token = req.header("Authorization")?.replace("Bearer ", "") ?? "";

        if(!token){
            res.status(411).json({
                message: "Incorrect token!"
            })
        }

    const decoded = jwt.verify(token, JWT_PASSWORD) as JwtPayload;

    if (!decoded || typeof decoded !== "object" || !decoded.id) {
        res.status(403).json({ message: "Invalid token." });
      }
  
      req.userId = decoded.id;
  
      next();
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "External Server Error"
        })
    }
}