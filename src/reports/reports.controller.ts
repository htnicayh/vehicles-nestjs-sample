import {
    Body, 
    Controller, 
    Get, 
    Param, 
    Patch, 
    Post, 
    UseGuards,
    Query
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { AuthorizeGuard } from '../guards/authorize.guard';
import { Serialize } from '../middleware/interceptors/interceptor.middleware';
import { CurrentUser } from '../users/decorator/current-user.decorator';
import { UserEntity } from '../users/entity/users.entity';
import { ApproveReportDto } from './dto/approve-report.dto';
import { CreateReportDto } from './dto/create-report.dto';
import { EstimateReportDto } from './dto/estimate-report.dto';
import { InstanceReportDto } from './dto/instance-report.dto';
import { ReportsService } from './reports.service';


@Controller('reports')
export class ReportsController {
    constructor(
        private readonly reportService: ReportsService
    ) {}

    @Post('/create-report')
    @UseGuards(AuthGuard)
    @Serialize(InstanceReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: UserEntity) {
        return this.reportService.createReport(body, user)
    }

    @Patch('/:id')
    @UseGuards(AuthorizeGuard)
    approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
        return this.reportService.changeApprove(id, body)
    }

    @Get()
    getReport(@Query() query: EstimateReportDto) {
        return this.reportService.getReport(query)
    }

}