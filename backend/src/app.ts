import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route";
import userRoute from "./routes/user.route";
import { authMiddleware } from "./middlewares/auth.middleware";
import swaggerUi from "swagger-ui-express";
import {specs} from "./common/swagger/swagger";

const app = express();

app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:80"],
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    swaggerOptions: {
        persistAuthorization: true,
    },
    customSiteTitle: 'User Management API Documentation',
    customCss: '.swagger-ui .topbar { display: none }'
}));

app.use("/api/auth", authRoute);
app.use("/api/users", authMiddleware, userRoute);

export default app;
