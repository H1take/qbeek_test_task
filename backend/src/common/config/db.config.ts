import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../../entities/user.entity";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || 'locahost',
    port: Number(process.env.DB_PORT || 4000),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '141604',
    database: process.env.DB_NAME || 'qbeek_back',
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
});
