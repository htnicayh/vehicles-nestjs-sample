import { Expose } from 'class-transformer'

export class InstanceUserDto {
    @Expose()
    id: number;

    @Expose()
    email: string;
}