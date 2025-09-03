import { AppDataSource } from "../common/config/db.config";
import {User, UserRole} from "../entities/user.entity";
import bcrypt from "bcrypt";
import {CreateUserDto} from "../dto/user.dto";

const userRepo = AppDataSource.getRepository(User);

export class UserService {
    static async getAll(filters?: { name?: string; email?: string }) {
        const query = userRepo.createQueryBuilder("user")
            .select(["user.id", "user.name", "user.email", "user.role"]);

        if (filters?.name) {
            query.andWhere("user.name ILIKE :name", { name: `%${filters.name}%` });
        }

        if (filters?.email) {
            query.andWhere("user.email ILIKE :email", { email: `%${filters.email}%` });
        }

        return query.getMany();
    }

    static async getById(id: number) {
        return userRepo.findOne({
            select: ["id", "name", "email", "role"],
            where: { id },
        });
    }

    static async create(data: CreateUserDto) {
        const existing = await userRepo.findOne({ where: { email: data.email } });
        if (existing) {
            throw new Error("Email already in use");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        const user = userRepo.create({ ...data, role: data.role as UserRole, password: hashedPassword });
        return userRepo.save(user);
    }

    static async update(id: number, data: Partial<User>) {
        const user = await userRepo.findOne({ where: { id } });
        if (!user) throw new Error("User not found");

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        Object.assign(user, data);
        return userRepo.save(user);
    }

    static async delete(id: number) {
        const user = await userRepo.findOne({ where: { id } });
        if (!user) throw new Error("User not found");

        return userRepo.remove(user);
    }
}
