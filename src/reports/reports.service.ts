import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';
import { ApproveReportDto } from './dto/approve-report.dto';
import { CreateReportDto } from './dto/create-report.dto';
import { EstimateReportDto } from './dto/estimate-report.dto';
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

    async changeApprove(id: string, body: ApproveReportDto): Promise<any> {
        const report = await this.Repo.findOne(id)
        if (!report) {
            throw new NotFoundException('Report Not Found')
        }
        report.approved = body.approved
        return this.Repo.save(report)
    }

    getReport(estimate: EstimateReportDto) {
        const { make, model, year, longtitude, latitude, mileage } = estimate
        return this.Repo.createQueryBuilder()
            .select('AVG(price)', 'price')
            .where('make = :make', { make })
            .andWhere('model = :model', { model })
            .andWhere('longtitude - :longtitude BETWEEN -10 AND 10', { longtitude })
            .andWhere('latitude - :latitude BETWEEN -10 AND 10', { latitude })
            .andWhere('year - :year BETWEEN -3 AND 3', { year })
            .andWhere('approved IS TRUE')
            .orderBy('mileage -:mileage', 'DESC')
            .setParameters({ mileage })
            .limit(3)
            .getRawOne()
    }
}
