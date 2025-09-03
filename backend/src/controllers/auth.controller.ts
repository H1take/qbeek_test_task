import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const user = await AuthService.register(req.body);

            res.status(201).json({ message: "User registered", user: { id: user.id, email: user.email } });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const data = await AuthService.login(req.body);

            res.cookie("accessToken", data.accessToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: true,
                maxAge: 15 * 60 * 1000,
            });

            res.cookie("refreshToken", data.refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.json({ message: "User login", user: { ...data.user } });
        } catch (err: any) {
            res.status(401).json({ message: err.message });
        }
    }

    static async refresh(req: Request, res: Response) {
        try {
            const { token } = req.body;
            const tokens = await AuthService.refresh(token);

            res.cookie("accessToken", tokens.accessToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: true,
                maxAge: 3600000,
            });

            res.cookie("refreshToken", tokens.refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: true,
                maxAge: 3600000,
            });

            res.json({ message: "Token's successfully refreshed" });
        } catch (err: any) {
            res.status(403).json({ message: "Invalid refresh token" });
        }
    }

    static async logout(req: Request, res: Response) {
        try {
            res.clearCookie("accessToken", {
                httpOnly: true,
                sameSite: "strict",
                secure: true,
            });
            res.clearCookie("refreshToken", {
                httpOnly: true,
                sameSite: "strict",
                secure: true,
            });

            res.json({ message: "Logged out successfully" });
        } catch (err: any) {
            res.status(500).json({ message: "Logout failed", error: err.message });
        }
    }

}
