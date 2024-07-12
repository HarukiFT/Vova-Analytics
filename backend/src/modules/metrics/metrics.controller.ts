import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { CreateMetricDto } from './dto/create-metric.dto';
import { ApiGuard } from '../projects/guards/api.guard';
import { CreateMetricsDto } from './dto/create-metrics.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ProjectGuard } from '../projects/guards/project.guard';
import { GetDayMetricsDto } from './dto/get-day-metrics.dto';

@Controller('metrics')
export class MetricsController {
    constructor(private readonly metricsService: MetricsService) {}

    @Post('/create')
    @UseGuards(ApiGuard)
    async createMetric(@Body() createMetricDto: CreateMetricDto, @Request() request: any) {
        await this.metricsService.createMetric(request.projectId, createMetricDto)
    }

    @Post('/mcreate')
    @UseGuards(ApiGuard)
    async createMetrics(@Body() createMetricsDto: CreateMetricsDto, @Request() request: any) {
        for (let dto of createMetricsDto.payload) {
            await this.metricsService.createMetric(request.projectId, dto)
        }
    }

    @Post('/byday')
    @UseGuards(AuthGuard, ProjectGuard)
    async getDayMetrics(@Body() getDayMetricsDto: GetDayMetricsDto ,@Request() request: any) {
        const projectId: string = request.projectId

        const from: Date = new Date(getDayMetricsDto.from)
        const to: Date = new Date(getDayMetricsDto.to)

        const result = await this.metricsService.groupByDay(projectId, getDayMetricsDto.value, from, to)
        return result
    }

    @Get('/values')
    @UseGuards(AuthGuard, ProjectGuard)
    async getDistinctValues(@Request() request: any) {
        const projectId: string = request.projectId

        return await this.metricsService.getDistinctValues(projectId)
    }
}
