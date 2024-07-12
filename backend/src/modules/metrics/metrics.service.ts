import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MetricDocument } from './schemas/metric.schema';
import mongoose, { Model } from 'mongoose';
import { CreateMetricDto } from './dto/create-metric.dto';
import metricsDayAggregate from './aggregates/metrics-day.aggregate';

@Injectable()
export class MetricsService {
    constructor(@InjectModel('Metric') private readonly metricsModel: Model<MetricDocument>) {}

    async createMetric(projectId: string, createMetricDto: CreateMetricDto): Promise<undefined> {
        const projectOID = mongoose.Types.ObjectId.createFromHexString(projectId)
        
        const timestampDate = new Date(createMetricDto.timestamp)
        
        await new this.metricsModel({
            timestamp: timestampDate, 
            value: createMetricDto.value, 
            project: projectOID, 
            metadata: createMetricDto.clarification ? { clarification: createMetricDto.clarification } : undefined})
            .save()
    }

    async groupByDay(projectId: string, targetValue: string, from: Date, to: Date) {
        const projectOID = mongoose.Types.ObjectId.createFromHexString(projectId)

        const pipeline = metricsDayAggregate(projectOID, targetValue, from, to)

        return await this.metricsModel.aggregate(pipeline).exec()
    }

    async getDistinctValues(projectId: string): Promise<string[]> {
        const projectOID = mongoose.Types.ObjectId.createFromHexString(projectId)

        return await this.metricsModel.distinct('value', {project: projectOID}).exec()
    }
}
