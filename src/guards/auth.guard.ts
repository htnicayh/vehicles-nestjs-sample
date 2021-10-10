import {
    BadRequestException,
    CanActivate,
    ExecutionContext
} from '@nestjs/common'

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()

        if (request.session.userID) {
            return request.session.userID
        } else {
            throw new BadRequestException('You must be sign-in our application')
        }
    }
}