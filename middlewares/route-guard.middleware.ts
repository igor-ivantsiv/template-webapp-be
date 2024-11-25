import { JwtPayload, verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  tokenPayload?: JwtPayload;
}

const isAuthenticated = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader.split(" ")[0] !== "Bearer") {
      throw new Error("Token headers do not match expected headers");
    }
    const token = authHeader.split(" ")[1];
    const payload = verify(token, process.env.TOKEN_SECRET as string) as JwtPayload;
    req.tokenPayload = payload
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: "Invalid or missing token" });
  }
}

export default isAuthenticated;