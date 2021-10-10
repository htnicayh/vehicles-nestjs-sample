import { Controller, Post, Get, Body, Inject, forwardRef, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/middleware/interceptors/interceptor.middleware';
import { CurrentUser } from 'src/users/decorator/current-user.decorator';
import { UserEntity } from 'src/users/entity/users.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { InstanceReportDto } from './dto/instance-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
    constructor(
        @Inject(forwardRef(() => ReportsService)) 
        private readonly reportService: ReportsService
    ) {}

    @Post('/create-report')
    @UseGuards(AuthGuard)
    @Serialize(InstanceReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: UserEntity) {
        return this.reportService.createReport(body, user)
    }

}
