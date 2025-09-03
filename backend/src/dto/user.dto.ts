import { IsEmail, IsOptional, IsString, MinLength, IsIn } from "class-validator";

export class CreateUserDto {
    @IsString()
    name!: string;

    @IsEmail()
    email!: string;

    @IsIn(["Admin", "Manager"])
    role!: string;

    @IsString()
    @MinLength(6)
    password!: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsIn(["Admin", "Manager"])
    role?: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;
}
