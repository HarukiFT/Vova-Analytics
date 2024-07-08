import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { ProjectsService } from "../projects.service";
import { ProjectDocument } from "../schemas/project.schema";
import { IJwtPayload } from "src/shared/interfaces/jwt-payload.interface";
import mongoose from "mongoose";

@Injectable()
export class ProjectGuard implements CanActivate {
    constructor(private projectsService: ProjectsService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const userPayload: IJwtPayload = request.user 
        const projectId: string = request.headers['project-id'] ?? ''

        try {
            const projectDocument: ProjectDocument | null = await this.projectsService.getProject(projectId)
            if (!projectDocument) {
                throw new ForbiddenException()
            }

            if ((<mongoose.Types.ObjectId>projectDocument.owner).toString() !== userPayload.id) {
                throw new ForbiddenException()
            }
        } catch {
            return false
        }

        request.projectId = projectId
        return true
    }
}