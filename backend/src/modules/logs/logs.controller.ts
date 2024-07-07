import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ProjectGuard } from '../projects/guards/project.guard';
import { LogsService } from './logs.service';

@Controller('logs')
export class LogsController {
    constructor(private readonly logsService: LogsService) {}

    @Post('/create')
    @UseGuards(AuthGuard, ProjectGuard)
    async createLog(@Body() createLogDto: CreateLogDto, @Request() request: any) {
        await this.logsService.createLog(request.projectId, createLogDto)
    }
}
