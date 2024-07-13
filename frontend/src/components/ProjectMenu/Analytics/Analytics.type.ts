import { ProjectData } from "../../../shared/typings/project.type";

export interface ProjectAnalyticsProp {
    projectData?: ProjectData
}

export interface CandleProp {
    timestamp: Date
    value: number
    height: number
}

export interface CandleData {
    date: string,
    count: number
}