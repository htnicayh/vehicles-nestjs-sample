import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { plainToClass } from 'class-transformer'
import { InstanceUserDto } from 'src/users/dto/instance-user.dto'

export class SerializeInterceptor implements NestInterceptor {
    intercept(_: ExecutionContext, handler: CallHandler): Observable<any> {
        // Run something before request is handled by the request handler
        
        return handler.handle().pipe(
            map((data: any) => {
                // Serialize
                return plainToClass(InstanceUserDto, data, {
                    excludeExtraneousValues: true // avoid some information in Dto not Expose
                })
            })
        )
    }
}