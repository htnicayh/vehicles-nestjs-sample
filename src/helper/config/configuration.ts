import { UserEntity } from "../../users/entity/users.entity"
import { ReportEntity } from "../../reports/entity/reports.entity"
import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export const ormConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [UserEntity, ReportEntity],
    synchronize: true
}