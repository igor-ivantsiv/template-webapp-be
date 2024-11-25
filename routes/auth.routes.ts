import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from "../models/User.model";
import isAuthenticated from '../middlewares/route-guard.middleware';

const authRoutes = Router();

// Signup

authRoutes.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
    const salt = bcrypt.genSaltSync(13);
    const passwordHash = bcrypt.hashSync(req.body.password, salt);
    try {
        const newUser = await User.create({
            ...req.body,
            passwordHash,
        });
        res.status(201).json(newUser);
    } catch (error: any) {
        if (error.code === 11000) {
            res.status(409).json({ message: "Username already taken" });
        } else {
            next(error);
        }
    }
});

// Login

authRoutes.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && bcrypt.compareSync(password, user.passwordHash)) {
            const payload = {
                userId: user._id,
                username: user.username,
            };
            const token = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
                algorithm: "HS256",
                expiresIn: "6h",
            });

            res.status(200).json({ token });
        } else {
            res.status(403).json({ message: "Incorrect password or username" });
        }
    } catch (error) {
        next(error);
    }
});

// Verify

authRoutes.get("/verify", isAuthenticated, (req: Request & { tokenPayload?: JwtPayload }, res: Response) => {
    res.status(200).json({
        userId: req.tokenPayload?.userId,
    });
});

export default authRoutes;