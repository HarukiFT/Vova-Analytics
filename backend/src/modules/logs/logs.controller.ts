import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { LogsService } from './logs.service';
import { ApiGuard } from '../projects/guards/api.guard';

@Controller('logs')
export class LogsController {
    constructor(private readonly logsService: LogsService) {}

    @Post('/create')
    @UseGuards(ApiGuard)
    async createLog(@Body() createLogDto: CreateLogDto, @Request() request: any) {
        await this.logsService.createLog(request.projectId, createLogDto)
    }
}
