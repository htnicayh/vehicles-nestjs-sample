import { UserEntity } from "src/users/entity/users.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class ReportEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    longtitude: number;

    @Column()
    latitude: number;

    @Column()
    mileage: number;

    @ManyToOne(() => UserEntity, (user) => user.reports)
    user: UserEntity
}

