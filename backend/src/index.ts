import "reflect-metadata";
import app from "./app";
import dotenv from "dotenv";
import { AppDataSource } from "./common/config/db.config";

dotenv.config();

const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
