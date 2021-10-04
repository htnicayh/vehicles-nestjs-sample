import {
    CallHandler, 
    ExecutionContext, 
    NestInterceptor,
    UseInterceptors
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

interface ClassDto {
    new (...args: any[]): {}
}

class SerializeInterceptor implements NestInterceptor {
    constructor(private readonly newDto: any) {}

    intercept(_: ExecutionContext, handler: CallHandler): Observable<any> {
        // Run something before request is handled by the request handler
        
        return handler.handle().pipe(
            map((data: any) => {
                // Serialize
                return plainToClass(this.newDto, data, {
                    excludeExtraneousValues: true // avoid some information in Dto not Expose
                })
            })
        )
    }
}

export function Serialize(newDto: ClassDto) {
    return UseInterceptors(new SerializeInterceptor(newDto))
}