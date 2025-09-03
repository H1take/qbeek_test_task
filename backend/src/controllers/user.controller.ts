import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    static async me(req: Request, res: Response) {
        try {
            if (!req.user) return res.status(401).json({ message: "Unauthorized" })
            res.json({ user: { ...req.user } })
        } catch (err: any) {
            res.status(500).json({ message: err.message })
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const { name, email } = req.query;
            const users = await UserService.getAll({
                name: name as string,
                email: email as string,
            });

            res.json(users);
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const user = await UserService.getById(id);

            if (!user) return res.status(404).json({ message: "User not found" });

            res.json(user);
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const { name, email, role, password } = req.body;
            const user = await UserService.create({ name, email, role, password });

            res.status(201).json(user);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    static async update(req: Request & { user?: any }, res: Response) {
        try {
            const id = parseInt(req.params.id);

            if (req.user.role === "Manager" && req.user.id !== id) {
                return res.status(403).json({ message: "Forbidden" });
            }

            const updated = await UserService.update(id, req.body);

            res.json(updated);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    static async delete(req: Request & { user?: any }, res: Response) {
        try {
            if (req.user.role !== "Admin") {
                return res.status(403).json({ message: "Forbidden" });
            }

            const id = parseInt(req.params.id);
            await UserService.delete(id);

            res.json({ message: "User deleted" });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
}
