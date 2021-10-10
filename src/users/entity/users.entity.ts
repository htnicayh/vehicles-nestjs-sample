import { ReportEntity } from "src/reports/entity/reports.entity";
import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn,
    OneToMany
} from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => ReportEntity, (report) => report.user)
    reports: ReportEntity[]
}
