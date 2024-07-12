import { IsDate, IsDateString, IsString } from "class-validator";

export class GetDayMetricsDto {
    @IsDateString()
    from: string

    @IsDateString()
    to: string

    @IsString()
    value: string
}