import {
    Column, Entity, OneToMany, PrimaryGeneratedColumn
} from "typeorm";
import { ReportEntity } from "../../reports/entity/reports.entity";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: true })
    admin: boolean;

    @OneToMany(() => ReportEntity, (report) => report.user)
    reports: ReportEntity[]
}
