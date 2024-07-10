import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { generateApiKey } from 'src/shared/utils/apiGenerator.utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProjectsService {
    constructor(@InjectModel('Project') private readonly projectModel: Model<ProjectDocument>, private readonly configService: ConfigService) {}

    async createProject(ownerId: string, createProject: CreateProjectDto): Promise<undefined> {
        const apiKey = generateApiKey(this.configService.get<number>('API_KEY_LENGTH')!)
        const ownerOIB: mongoose.Types.ObjectId = mongoose.Types.ObjectId.createFromHexString(ownerId)

        await new this.projectModel({...createProject, client: "", placeLink: "", owner: ownerOIB, apiKey}).save()
    }

    async fetchProjects(ownerId: string): Promise<ProjectDocument[]> {
        const ownerOID: mongoose.Types.ObjectId = mongoose.Types.ObjectId.createFromHexString(ownerId)

        const projects: ProjectDocument[] = await this.projectModel.find({owner: ownerOID}).exec()
        return projects
    }

    async getProject(projectId: string): Promise<ProjectDocument | null> {
        const projectOID: mongoose.Types.ObjectId = mongoose.Types.ObjectId.createFromHexString(projectId)

        return await this.projectModel.findById(projectOID).exec()
    }

    async getProjectByApi(apiKey: string): Promise<ProjectDocument | null> {
        return await this.projectModel.findOne({apiKey}).exec()
    }

    async updateProject(projectId: string, updateData: Record<string, string>): Promise<void> {
        const updateMap = {
            client: updateData.client || undefined,
            placeLink: updateData.placeLink || undefined,
            name: updateData.name || undefined
        }

        const projectOID = mongoose.Types.ObjectId.createFromHexString(projectId)

        await this.projectModel.updateOne({_id: projectOID}, {$set: updateMap}).exec()
    }
}