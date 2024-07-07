import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ProjectGuard } from '../projects/guards/project.guard';
import { CreateMetricDto } from './dto/create-metric.dto';
import { ApiGuard } from '../projects/guards/api.guard';

@Controller('metrics')
export class MetricsController {
    constructor(private readonly metricsService: MetricsService) {}

    @Post('/create')
    @UseGuards(AuthGuard, ApiGuard)
    async createMetric(@Body() createMetricDto: CreateMetricDto, @Request() request: any) {
        await this.metricsService.createMetric(request.projectId, createMetricDto)
    }
}
