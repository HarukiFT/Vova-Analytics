import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MetricSchema } from './schemas/metric.schema';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Metric', schema: MetricSchema}]),
    ProjectsModule
  ],
  providers: [
    MetricsService
  ],
  controllers: [MetricsController]
})
export class MetricsModule {}
