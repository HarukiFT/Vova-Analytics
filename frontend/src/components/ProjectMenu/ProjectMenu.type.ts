import { ProjectData } from "../../shared/typings/project.type"

export type SectionData = Record<string, {title: string, description: string}>

export interface ProjectMenuProps {
    projectData?: ProjectData
}

export interface GeneralMenuProps extends ProjectMenuProps {
    setReady: (state: boolean) => void
    onUpdate: () => void
    trigger: boolean,
}