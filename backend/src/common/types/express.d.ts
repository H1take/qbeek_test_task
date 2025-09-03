import "express";
import { TokenPayload } from "./token";

declare module "express" {
    export interface Request {
        user?: TokenPayload;
    }
}
