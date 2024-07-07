import { Body, Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { IJwtPayload } from 'src/shared/interfaces/jwt-payload.interface';
import { ProjectDocument } from './schemas/project.schema';
import { ProjectGuard } from './guards/project.guard';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Post('/create')
    @UseGuards(AuthGuard)
    async createProject(@Body() createProjectDto: CreateProjectDto, @Request() request: any): Promise<undefined> {
        const ownerId: string = (<IJwtPayload>request.user).id
        
        await this.projectsService.createProject(ownerId, createProjectDto)
    }

    @Get('/fetch')
    @UseGuards(AuthGuard)
    async fetchProjects(@Request() request: any): Promise<ProjectDocument[]> {
        const ownerId = (<IJwtPayload>request.user).id

        const projectDocuments = await this.projectsService.fetchProjects(ownerId)
        return projectDocuments
    }

    @Get('/Get')
    @HttpCode(200)
    @UseGuards(AuthGuard, ProjectGuard)
    async getProject(@Request() request: any): Promise<ProjectDocument> {
        const projectId: string = request.headers['project-id']

        return (await this.projectsService.getProject(projectId))!
    }
}