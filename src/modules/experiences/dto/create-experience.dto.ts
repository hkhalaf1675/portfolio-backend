import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class CreateExperienceDto {
    @IsNotEmpty()
    jobTitle: string;
    
    @IsNotEmpty()
    companyName: string;

    @IsOptional()
    description?: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    startDate?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    endDate?: Date;
}
