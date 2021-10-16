import { forwardRef, Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { Request, Response, NextFunction } from 'express'
import { UserEntity } from "../users/entity/users.entity";

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserEntity
        }
    }
}

@Injectable()
export class CurrentMiddleware implements NestMiddleware {
    constructor(
        @Inject(forwardRef(() => UsersService)) 
        private readonly userService: UsersService) {
    }

    async use(req: Request, res: Response, next: NextFunction) {
        const { userID } = req.session || {}
        if (userID) {
            const user = await this.userService.findOne(userID)
            req.currentUser = user
        }

        next();
    }
}