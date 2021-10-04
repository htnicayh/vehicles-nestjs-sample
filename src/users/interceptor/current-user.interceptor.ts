import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable
} from '@nestjs/common'
import { UsersService } from '../users.service'
import { Observable } from 'rxjs'

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private readonly usersService: UsersService) {}

    async intercept(context: ExecutionContext, handler: CallHandler): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest()
        const { userID } = request.session

        if (userID) {
            const user = await this.usersService.findOne(userID)
            request.currentUser = user
        }

        return handler.handle()
    }
}