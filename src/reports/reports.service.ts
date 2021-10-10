import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportEntity } from './entity/reports.entity';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(ReportEntity) private readonly Repo: Repository<ReportEntity>
    ) {}

    createReport(reportDto: CreateReportDto, user: UserEntity): Promise<CreateReportDto> {
        const report = this.Repo.create(reportDto)
        report.user = user
        return this.Repo.save(report)
    }
}
