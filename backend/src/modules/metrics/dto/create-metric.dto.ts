import { IsDateString, IsDefined, IsString } from "class-validator";

export class CreateMetricDto {
    @IsString()
    value: string

    @IsDateString()
    timestamp: string

    clarification: any
}