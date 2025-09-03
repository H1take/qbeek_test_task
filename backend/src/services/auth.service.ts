import { AppDataSource } from "../common/config/db.config";
import {User, UserRole} from "../entities/user.entity";
import { generateTokens } from "../common/utils/jwt.util";
import {CreateUserDto} from "../dto/user.dto";
import {LoginDto} from "../dto/auth.dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRepo = AppDataSource.getRepository(User);

export class AuthService {
    static async register(data: CreateUserDto) {
        if (!data.email || !data.password) {
            throw new Error("Email and password are required");
        }

        if (data.password.length < 6) {
            throw new Error("Password must be at least 6 characters");
        }

        const existing = await userRepo.findOne({ where: { email: data.email } });
        if (existing) {
            throw new Error("Email already in use");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = userRepo.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role as UserRole,
        });

        await userRepo.save(user);

        return user;
    }

    static async login(data: LoginDto) {
        const user = await userRepo.findOne({ where: { email: data.email } });
        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(data.password, user.password);
        if (!isValid) throw new Error("Invalid credentials");

        const payload = { id: user.id, role: user.role, name: user.name, email: user.email };
        const { accessToken, refreshToken } = generateTokens(payload);

        return {
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
            accessToken,
            refreshToken,
        };
    }

    static async refresh(token: string) {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as any;
        const payload = { id: decoded.id, role: decoded.role };
        return generateTokens(payload);
    }
}
