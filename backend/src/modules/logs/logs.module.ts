import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { ProjectsModule } from '../projects/projects.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LogSchema } from './schemas/log.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Log', schema: LogSchema}]), ProjectsModule],
  providers: [LogsService],
  controllers: [LogsController]
})
export class LogsModule {}
