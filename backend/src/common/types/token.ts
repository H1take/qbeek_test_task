import { UserRole } from "../../entities/user.entity";

export interface TokenPayload {
    id: number;
    email: string;
    role: UserRole;
    name: string;
}