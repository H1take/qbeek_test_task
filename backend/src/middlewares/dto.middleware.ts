import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function dtoMiddleware(dtoClass: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoObj = plainToInstance(dtoClass, req.body);
        const errors = await validate(dtoObj);

        if (errors.length > 0) {
            return res.status(400).json({
                message: "Validation failed",
                errors: errors.map((e) => ({
                    property: e.property,
                    constraints: e.constraints,
                })),
            });
        }

        req.body = dtoObj;
        next();
    };
}
